import { ChangeDetectorRef, Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CheckDepositLineService, CheckDepositLine, CheckDepositService } from '@ss/treasury/api-check-deposits';
import { Check, CheckService, BankCheck } from '@ss/treasury/api-checks';
import { SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { dateTimeToStr, LoginService } from '@ss/common/api-common';
import { BankDescriptionPipe } from '@ss/administration/api-bank';
import { UndepositedCheckLookupModel } from './undeposited-check-lookup.model';

@Component({
    selector: 'ss-check-deposit-line-detail',
    templateUrl: './check-deposit-line-detail.component.html',
    styleUrls: ['./check-deposit-line-detail.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MatMiniFabButton,
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        MatError,
        UiAutoCompleteComponent,
        BankDescriptionPipe,
        AsyncPipe
    ]
})
export class CheckDepositLineDetailComponent implements OnInit {
    private fb = inject(FormBuilder);
    private checkSrv = inject(CheckService);
    private checkDepositSrv = inject(CheckDepositService);
    private loginSrv = inject(LoginService);
    private cdr = inject(ChangeDetectorRef);

    form: UntypedFormGroup = null;
    checkLookup: UndepositedCheckLookupModel | null = null;
    checkBankId = signal<number | null>(null);

    constructor(private entitySrv: CheckDepositLineService,
                private snackBarSrv: SnackBarService,
                private route: Router,
                private router: ActivatedRoute) {}

    ngOnInit(): void {
        const newLine: CheckDepositLine = {
            id: 0,
            depositId: 0,
            checkId: 0
        };

        this.router
            .parent
            .parent
            .paramMap
            .pipe(
                switchMap(res => {
                    const depositId = +res.get('id') || 0;
                    this.entitySrv.setParentId(depositId);
                    return this.checkDepositSrv.get(depositId);
                }),
                tap(deposit => {
                    const bankId = deposit?.bankId || 0;
                    this.checkBankId.set(bankId || null);
                    this.checkLookup = new UndepositedCheckLookupModel(this.checkSrv, bankId);
                    this.checkLookup.onObjectSelected = c => this.onCheck(c);
                    this.cdr.markForCheck();
                }),
                switchMap(() => this.router.paramMap),
                switchMap(res => {
                    const id = +res.get('id');
                    return id > 0 ? this.entitySrv.get(id) : of(newLine);
                }))
            .subscribe(line => {
                this.form = this.fb.group({
                    id:        [line.id],
                    depositId: [this.entitySrv.getParentId()],
                    checkId:   [line.checkId || null, Validators.required],
                    createdBy: [line.createdBy || this.loginSrv.appCtx.id],
                    createdAt: [line.createdAt || dateTimeToStr(new Date())],
                    number:    [{ value: line.checkNumber, disabled: true }],
                    date:      [{ value: line.date, disabled: true }],
                    amount:    [{ value: line.amount, disabled: true }]
                });
                this.cdr.markForCheck();
                if (line.checkId) {
                    this.checkSrv.get(line.checkId).subscribe(c => this.onCheck(c));
                }
            });
    }

    private onCheck(c: Check | BankCheck) {
        this.form.patchValue({
            number: c?.number,
            date:   c?.date,
            amount: c?.amount
        });
        this.cdr.markForCheck();
    }

    goBack() {
        this.route.navigate(['..'], { relativeTo: this.router }).then();
    }

    save() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const value = this.form.getRawValue();
        this.entitySrv
            .save(value)
            .subscribe({
                next: () => {
                    this.snackBarSrv.showSuccessMessage();
                    this.entitySrv.notifyChanged();
                    this.goBack();
                },
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                }
            });
    }
}
