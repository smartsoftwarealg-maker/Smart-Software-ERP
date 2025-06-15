import { Component, inject, input, OnInit, signal } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { HttpEventType} from '@angular/common/http';
import { ActivatedRoute, Router} from '@angular/router';
import { ShellService, SnackBarService} from '@ss/common/ui-shell';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ss/common/ui-lang';
import { AccJournalsService, Journal, ScheduledSalesExcelInjectionService } from '@ss/accounting/accounting-api';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MaterialModule } from '@ss/common/api-common';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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

    ]
})
export class GeneralExcelInjectionComponent implements OnInit {
    #injectSrv = inject(ScheduledSalesExcelInjectionService);
    #router = inject(Router);
    #snackBarSrv = inject(SnackBarService);
    #shellSrv = inject(ShellService);
    #activatedRoute = inject(ActivatedRoute);
    #journalSrv = inject(AccJournalsService);
    #formBuilder = inject(FormBuilder);

    journals = this.#journalSrv.getList(0, 50);
    updatable = false;
    requiredFileType = input('.xlsx');
    processing = signal(false);
    journalList = signal<Journal[]>([]);
    journalLookup = new DefaultAutoCompleteModel(this.#journalSrv);

    fileName = '';
    uploadProgress = 0;
    uploadSub: Subscription;
    columns = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    form = this.#formBuilder.group({
        journal:      ['', Validators.required],
        day:          ['', Validators.required],
        number:       ['', Validators.required],
        period:       ['', Validators.required],
        accountNo:    ['', Validators.required],
        description:  ['', Validators.required],
        customerCode: [''],
        denomination: [''],
        reference:    [''],
        checkNo:      [''],
        debit:        ['', Validators.required],
        credit:       ['', Validators.required],
    });

    ngOnInit(): void {
        this.#shellSrv.setGoBackPathByRelativeUrl('..');
    }

    onChange(e: any) {
        this.fileName = e[0]?.name;
    }

    private appendFormValue(formData: FormData) {
        const formValue = this.form.value;
        formData.append("JOURNAL", formValue.journal)
        formData.append("DAY", formValue.day)
        formData.append("NUMBER", formValue.number)
        formData.append("PERIOD", formValue.period)
        formData.append("ACCOUNTNO", formValue.accountNo)
        formData.append("DESCRIPTION", formValue.description)
        formData.append("CUSTOMER_CODE", formValue.customerCode)
        formData.append("DENOMINATION", formValue.denomination)
        formData.append("REFERENCE", formValue.reference)
        formData.append("CHECKNO", formValue.checkNo)
        formData.append("DEBIT", formValue.debit)
        formData.append("CREDIT", formValue.credit)

    }

    onFileSelected(files: any) {
        const file:File = files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append('file', file);
            this.appendFormValue(formData);
            this.processing.set(true);
            this.uploadSub = this.#injectSrv
                .inject(formData)
                .pipe(finalize(() => {
                    this.reset();
                    this.processing.set(false);
                }))
                .subscribe({
                    next: (res: any) => {
                        if (res.type == HttpEventType.UploadProgress) {
                            this.uploadProgress = Math.round(100 * (res.loaded / res.total));
                        } else if (res.type == HttpEventType.Response) {
                            const ret = res.body;
                            if (ret['count'] > 0) {
                                this.#snackBarSrv.showSuccessMessage();
                                this.processing.set(false);
                            }
                            this.cancel();
                        }
                    },
                    error: err => {
                        this.processing.set(false);
                        throw err;
                    }
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
        this.#router.navigate(['../'], { relativeTo: this.#activatedRoute }).then();
    }
}

