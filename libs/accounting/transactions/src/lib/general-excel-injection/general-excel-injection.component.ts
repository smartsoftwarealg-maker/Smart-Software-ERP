import {
    Component,
    DestroyRef,
    inject,
    input,
    OnInit,
    signal,
} from '@angular/core';
import {
    catchError,
    finalize,
    of,
    startWith,
    Subscription,
    switchMap,
} from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ss/common/ui-lang';
import {
    AccJournalsService,
    Journal,
    ScheduledSalesExcelInjectionService,
    XITotal,
    XLSInjectionFormat,
} from '@ss/accounting/accounting-api';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { LanguageService, MaterialModule } from '@ss/common/api-common';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExcelInjectionFormatService } from '@ss/accounting/accounting-api';
import { AsyncPipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DialogComponent } from './dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'ss-general-excel-injection',
    templateUrl: './general-excel-injection.component.html',
    styleUrls: ['./general-excel-injection.component.scss'],
    standalone: true,
    imports: [
        TranslateDirective,
        MatMiniFabButton,
        MatButton,
        MatProgressBar,
        TranslatePipe,
        MatFormField,
        MatLabel,
        MaterialModule,
        AsyncPipe,
    ],
})
export class GeneralExcelInjectionComponent implements OnInit {
    #destroyRef = inject(DestroyRef);
    #injectSrv = inject(ScheduledSalesExcelInjectionService);
    #router = inject(Router);
    #snackBarSrv = inject(SnackBarService);
    #shellSrv = inject(ShellService);
    #activatedRoute = inject(ActivatedRoute);
    #journalSrv = inject(AccJournalsService);
    #formBuilder = inject(FormBuilder);
    #excelFormatSrv = inject(ExcelInjectionFormatService);
    #xlsFormat = signal<number>(null);
    #confirmationSrv = inject(ConfirmationDialogService);
    #langSrv = inject(LanguageService);
    #dialog = inject(MatDialog);

    journals = this.#journalSrv.getList(0, 50);
    updatable = false;
    excelFormat = new FormControl<string | null>('');
    requiredFileType = input('.xlsx');
    processing = signal(false);
    journalList = signal<Journal[]>([]);
    journalLookup = new DefaultAutoCompleteModel(this.#journalSrv);

    formats = this.excelFormat.valueChanges.pipe(
        takeUntilDestroyed(this.#destroyRef),
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => this.#excelFormatSrv.getList(0, 50, value || '')),
        map((res) => res.body),
    );

    fileName = '';
    uploadProgress = 0;
    uploadSub: Subscription;
    columns = [
        '',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];
    form = this.#formBuilder.group({
        journal: ['', Validators.required],
        day: ['', Validators.required],
        number: ['', Validators.required],
        period: ['', Validators.required],
        accountNo: ['', Validators.required],
        description: ['', Validators.required],
        customerCode: [''],
        denomination: [''],
        reference: [''],
        checkNo: [''],
        debit: ['', Validators.required],
        credit: ['', Validators.required],
        deleteExisting: [false, Validators.required],
    });

    ngOnInit(): void {
        this.#shellSrv.setGoBackPathByRelativeUrl('..');
    }

    onChange(e: any) {
        this.fileName = e[0]?.name;
    }

    private appendFormValue(formData: FormData) {
        const formValue = this.form.value;
        formData.append('JOURNAL', formValue.journal);
        formData.append('DAY', formValue.day);
        formData.append('NUMBER', formValue.number);
        formData.append('PERIOD', formValue.period);
        formData.append('ACCOUNTNO', formValue.accountNo);
        formData.append('DESCRIPTION', formValue.description);
        formData.append('CUSTOMER_CODE', formValue.customerCode);
        formData.append('DENOMINATION', formValue.denomination);
        formData.append('REFERENCE', formValue.reference);
        formData.append('CHECKNO', formValue.checkNo);
        formData.append('DEBIT', formValue.debit);
        formData.append('CREDIT', formValue.credit);
        formData.append('DELETE_EXISTING', formValue.deleteExisting + '');
    }

    onFileSelected(files: any) {
        const file: File = files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append('file', file);
            this.appendFormValue(formData);
            this.processing.set(true);
            this.uploadSub = this.#injectSrv
                .inject(formData)
                .pipe(
                    takeUntilDestroyed(this.#destroyRef),
                    finalize(() => {
                        this.reset();
                        this.processing.set(false);
                    }),
                )
                .subscribe({
                    next: (res: any) => {
                        if (res.type == HttpEventType.UploadProgress) {
                            this.uploadProgress = Math.round(
                                100 * (res.loaded / res.total),
                            );
                        } else if (res.type == HttpEventType.Response) {
                            const ret: XITotal = res.body;
                            this.processing.set(false);
                            if (ret) {
                                const msg =
                                    this.#langSrv.translate('COMMON_TOTAL');
                                const debit =
                                    this.#langSrv.translate('COMMON_DEBIT');
                                const credit =
                                    this.#langSrv.translate('COMMON_CREDIT');
                                this.openSuccessDialog(ret);
                                // window.alert(
                                //     `${msg}, ${debit}: ${ret.debit.toFixed(2)} - ${credit}: ${ret.credit.toFixed(2)}`,
                                // );
                                // this.#snackBarSrv.showSuccessMessage();
                            }
                            this.cancel();
                        }
                    },
                    error: (err) => {
                        this.processing.set(false);
                        throw err;
                    },
                });
        }
    }

    cancelUpload() {
        this.uploadSub.unsubscribe();
        this.reset();
    }

    reset() {
        this.uploadProgress = null;
        this.uploadSub = null;
    }

    cancel() {
        this.#router
            .navigate(['../'], { relativeTo: this.#activatedRoute })
            .then();
    }

    saveFormat(value: string) {
        const v = this.form.getRawValue();
        const format: XLSInjectionFormat = {
            id: this.#xlsFormat() || 0,
            description: this.excelFormat.value,
            xlsFormat: `${v.journal},${v.day},${v.number},${v.period},${v.accountNo},${v.description},${v.customerCode},${v.denomination},${v.reference},${v.checkNo},${v.debit},${v.credit}`,
            formatType: 1,
        };
        this.#excelFormatSrv.save(format).subscribe((res) => {
            if (res > 0) {
                this.#snackBarSrv.showSuccessMessage();
            }
        });
    }

    deleteFormat() {
        if (this.#xlsFormat()) {
            this.#confirmationSrv
                .confirmDelete()
                .pipe(
                    switchMap((res) =>
                        res
                            ? this.#excelFormatSrv.remove(this.#xlsFormat())
                            : of({ count: 0 }),
                    ),
                )
                .subscribe((res) => {
                    if (res.count > 0) {
                        this.#snackBarSrv.showSuccessMessage();
                    }
                });
        }
    }

    optionSelected(format: MatAutocompleteActivatedEvent) {
        this.excelFormat.setValue(format.option.value.description);
        this.#xlsFormat.set(format.option.value.id);
        if (format.option?.value) {
            const f: string[] = format.option.value.xlsFormat.split(',');
            const controls = [
                'journal',
                'day',
                'number',
                'period',
                'accountNo',
                'description',
                'customerCode',
                'denomination',
                'reference',
                'checkNo',
                'debit',
                'credit',
            ];
            f.forEach((item, index) => {
                this.form.get(controls[index])?.setValue(item);
            });
        }
    }

    openSuccessDialog(xiTotal: XITotal) {
        this.#dialog.open(DialogComponent, { data: xiTotal });
    }
}
