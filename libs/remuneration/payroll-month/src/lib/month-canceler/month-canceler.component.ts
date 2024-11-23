import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {SnackBarService} from '@ss/common/ui-shell';
import {LanguageService} from '@ss/common/api-common';
import { catchError, delay, Observable, of, switchMap, tap } from "rxjs";
import { NgIf } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TranslatePipe } from '../../../../../common/ui-lang/src/lib/translate.pipe';

@Component({
    selector: 'ss-month-canceler',
    templateUrl: './month-canceler.component.html',
    styleUrls: ['./month-canceler.component.scss'],
    standalone: true,
    imports: [NgIf, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatButton, MatProgressBar, MatProgressSpinner, TranslatePipe]
})
export class MonthCancelerComponent implements OnInit {
    form: UntypedFormGroup = null;
    processing = false;
    maxMonth = 0;
    constructor(private selectorSrv: PayrollMonthService,
                private formBuilder: UntypedFormBuilder,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private confirmationSrv: ConfirmationDialogService,
                private snackBarSrv: SnackBarService,
                private langSrv: LanguageService) {
    }

    ngOnInit(): void {
        this.selectorSrv
            .maxMonth()
            .subscribe(res => {
                this.maxMonth = res.month;
                this.form = this.formBuilder
                    .group({
                        year: [+(res.month / 100).toFixed(0), Validators.required],
                        month: [+(res.month % 100).toFixed(0), Validators.required],
                    })
            })
    }

    cancel() {
        this.router
            .navigate(['../'], { relativeTo: this.activatedRoute })
            .then();
    }

    retries(count: number): Observable<boolean> {
        return count >= 5?
            of(false) :
            this.selectorSrv
                .maxMonth()
                .pipe(delay(2000),
                    switchMap(res => res.month < this.maxMonth? of(true) : this.retries(count + 1)));
    }

    close() {
        let oldMonth = 0;
        let currMonth = 0;
        this.confirmationSrv
            .confirm(this.langSrv.translate('REMUN_MONTH_CANCELLATION'),
                this.langSrv.translate('REMUN_CANCEL_MONTH') + '?',
                false,
                false)
            .pipe(
                switchMap(confirmed => {
                    this.processing = confirmed;
                    return confirmed ?
                        this.selectorSrv
                            .cancel()
                            .pipe(switchMap(() => this.selectorSrv.maxMonth()),
                                  switchMap(res => this.selectorSrv.selectMonth(res.month))) :
                        of(false)
                }),
                catchError(err =>
                    this.retries(1)
                        .pipe(tap(res => {
                                if (!res) {
                                    throw err;
                                }
                            }),
                            switchMap(() => this.selectorSrv.maxMonth()),
                            switchMap(res => this.selectorSrv.selectMonth(res.month)))
                ))
            .subscribe({
                    next: res => {
                        if (res) {
                            this.snackBarSrv.showSuccessMessage();
                            this.router.navigate(['../'], {relativeTo: this.activatedRoute}).then();
                        } else {
                            this.snackBarSrv.showFailureMessage();
                        }
                        this.processing = false;
                    },
                    error: err => {
                        this.processing  = false;
                        throw err;
                    }
                }
            );
    }

    public canDeactivate(): boolean {
        if (this.processing) {
            window.confirm(this.langSrv.translate('COMMON_BUSY'));
        }
        return !this.processing;
    }

}
