import { Component, inject, input, OnInit, signal } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ss/common/ui-lang';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MaterialModule } from '@ss/common/api-common';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { FormBuilder, Validators } from '@angular/forms';
import { LoanExcelInjectionService } from './Loan-excel-injection.service';
import { LoanTypeService } from '@ss/payroll-common';

@Component({
    selector: 'ss-loan-injection',
    templateUrl: './loan-injection.component.html',
    styleUrls: ['./loan-injection.component.scss'],
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
        UiAutoCompleteComponent,
    ],
})
export class LoanInjectionComponent implements OnInit {
    #injectSrv = inject(LoanExcelInjectionService);
    #router = inject(Router);
    #snackBarSrv = inject(SnackBarService);
    #shellSrv = inject(ShellService);
    #activatedRoute = inject(ActivatedRoute);
    #formBuilder = inject(FormBuilder);
    #loanTypeSrv = inject(LoanTypeService);

    requiredFileType = input('.xlsx');
    processing = signal(false);

    loanLookup = new DefaultAutoCompleteModel(this.#loanTypeSrv);

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
        loan: ['', Validators.required],
        employee: ['', Validators.required],
        amount: ['', Validators.required],
        month_count: ['', Validators.required],
        initial_month: ['', Validators.required],
    });

    ngOnInit(): void {
        this.#shellSrv.setGoBackPathByRelativeUrl('..');
        this.#shellSrv.setTitle('PAYROLL_LOAN_INJECTION');
    }

    onChange(e: any) {
        this.fileName = e[0]?.name;
    }

    private appendFormValue(formData: FormData) {
        const formValue = this.form.value;
        formData.append('loan', formValue.loan);
        formData.append('id', formValue.employee);
        formData.append('amount', formValue.amount);
        formData.append('count', formValue.month_count);
        formData.append('period', formValue.initial_month);
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
                            const ret = res.body;
                            if (ret['count'] > 0) {
                                this.#snackBarSrv.showSuccessMessage();
                                this.processing.set(false);
                            }
                            this.cancel();
                        }
                    },
                    error: (err) => {
                        this.processing.set(false);
                        this.#snackBarSrv.showFailureMessage();
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
}
