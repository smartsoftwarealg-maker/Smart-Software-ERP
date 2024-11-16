import { Component, inject, OnInit } from '@angular/core';
import {
    AbstractControl, ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {
    AccFileService,
    AccPoliciesService,
    ACCPolicy,
    ACCTransactionLine,
    AccTransactionLineService,
    AnnexCodeService,
    SCALE
} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {LookupsService} from '@ss/common/api-lookup';
import { LoginService, MaterialModule } from "@ss/common/api-common";
import { map, Observable, of } from "rxjs";
import {switchMap, tap} from 'rxjs/operators';
import {Account, AccountAutocompleteModel, AccountService} from '@ss/accounting/api-accounts';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import {AgentService} from '@ss/logistics/api-agent';
import {CostCenterService} from '@ss/logistics/api-cost-center';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";

import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";


@Component({
    selector: 'ss-transaction-lines-detail',
    templateUrl: './transaction-lines-detail.component.html',
    styleUrls: ['./transaction-lines-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,

        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        CommonUiConfirmationDialogModule,

    ],
})
export class TransactionLinesDetailComponent implements OnInit {
    private ccSrv = inject(CostCenterService);
    private router = inject(Router);
    private fileSrv = inject(AccFileService);
    private customerSrv = inject(AgentService);
    private loginSrv = inject(LoginService);
    private annexCodeSrv = inject(AnnexCodeService);
    private accPolicySrv = inject(AccPoliciesService);
    private accountSrv =  inject(AccountService);

    accountLookupModel  = new AccountAutocompleteModel(this.accountSrv);
    customerLookupModel = new DefaultAutoCompleteModel(this.customerSrv, 'id', 'denomination');
    ccLookupModel       = new DefaultAutoCompleteModel(this.ccSrv, 'id', 'code');
    annexCodeLookupMode = new DefaultAutoCompleteModel(this.annexCodeSrv, 'code');
    accPolicy: ACCPolicy = null;
    public form: UntypedFormGroup | null = null;
    id = 0;
    transactionId = 0;
    fileId = 0;
    selectedAccount: Account = null;
    isCloded = this.fileSrv.accFile.closed;
    private formValidator: ValidatorFn =
        (group: AbstractControl): ValidationErrors | null => {
            let result = null;
            if (this.selectedAccount) {
                if (!group.get('customerId').value && this.selectedAccount?.customerCode) {
                    group.get('customerId').setErrors({invalid: true});
                    result = {invalid: true};
                }
                if (!group.get('accountId').value) {
                    group.get('accountId').setErrors({ invalid: true });
                    result = {invalid: true};
                }
                if (group.get('debit').value === 0 && group.get('credit').value === 0) {
                    group.get('debit').setErrors({ invalid: true });
                    group.get('credit').setErrors({ invalid: true });
                    result = {invalid: true};
                }
                if (!group.get('reference').value && this.selectedAccount?.analyzed) {
                    group.get('reference').setErrors({invalid: true});
                    result = {invalid: true};
                }
                if (!group.get('costCenterId').value && this.selectedAccount?.ccRequired) {
                    group.get('costCenterId').setErrors({invalid: true});
                    result = {invalid: true};
                }
                if (this.selectedAccount.accountNo.startsWith('51') && this.accPolicy?.analyzeChecks && !group.get('checkNo').value) {
                    group.get('checkNo').setErrors({invalid: true});
                    result = {invalid: true};
                }
            }
            return result;
        };

    constructor(
        public entitySrv: AccTransactionLineService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        this.accountLookupModel.onObjectSelected = (obj) => this.accountSelected(obj);
    }

    setupForm(e: ACCTransactionLine): UntypedFormGroup {
        return  this.formBuilder.group({
            id:           [((e.fileId * SCALE + e.oid) * SCALE + e.lineNumber) || 0],
            fileId:       [e.fileId || this.loginSrv.appCtx.accFile],
            oid:          [e.oid || this.transactionId],
            accountNo:    [e.accountNo],
            customer:     [e.customer],
            lineNumber:   [e.lineNumber || 1],
            c_o_d:        [e.c_o_d],
            balance:      [e.balance],
            debit:        [{ value: e.balance > 0? e.balance : 0.0, disabled: e.balance < 0 }],
            credit:       [{ value: e.balance < 0? -e.balance : 0.0, disabled: e.balance > 0 } ],
            reference:    [e.reference],
            checkNo:      [e.checkNo],
            description:  [e.description, Validators.required],
            customerId:   [e.customerId],
            accountId:    [e.accountId, Validators.required],
            costCenterId: [e.costCenterId]
        }, { validators: this.formValidator });
    }

    ngOnInit() {
        this.load();
    }

    private accountSelected(a: Account) {
        this.selectedAccount = a;
    }


    public loadEntity(id: number): Observable<ACCTransactionLine> {
        if (id == null) {
            this.shellSrv.goBack();
            return of(null);
        }
        if (id === 0) {
            return this.entitySrv
                .getPieceSummary(this.transactionId)
                .pipe(map(res => {
                    return <ACCTransactionLine> {
                        id: 0,
                        description: res.description,
                        balance:     -(res.balance || 0)
                    }
                }));
        }
        return this.entitySrv.get(id);
    }

    public finishLoading(e: ACCTransactionLine) {
        this.accountSrv
            .get(e.accountId)
            .subscribe(res => this.selectedAccount = res);
        this.form = this.setupForm(e);
    }

    public load() {
        this.loginSrv
            .loadContext()
            .pipe(
                switchMap(_ => this.accPolicySrv.get(this.loginSrv.appCtx.center)),
                tap(pol => this.accPolicy = pol),
                switchMap(_ => this.route.parent.parent.params),
                tap(p => {
                    const id = +p['id'] || 0;
                    this.transactionId = id % SCALE;
                    this.fileId = +(id / SCALE).toFixed(0);
                }),
                switchMap(_ => this.route.params),
                switchMap(p => {
                    this.id = +p['id'];
                    return this.loadEntity(this.id || 0);
                })
            ).subscribe({
                next: entity => {
                    if (entity) {
                        this.finishLoading(entity);
                    }
                },
                error: error => {
                    this.shellSrv.setLoading(false);
                    this.shellSrv.showRetry(() => this.load());
                    throw error;
                }
            });
    }

    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route }).then();
        // this.shellSrv.goBack();
    }

    save() {
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_INVALID_FORM');
            return;
        }

        const val = this.form.getRawValue();
        const old = val.balance;
        val.balance = val.debit || 0 - val.credit || 0;
        // if (old * val.balance < 0) {
        //     console.log(old, val.balance, val.debit, val.credit);
        // }
        if (this.entitySrv.getParentId() != null) {
            val.id = this.id;
            const obs: Observable<any> = val.id === 0
                ? this.entitySrv
                    .add(val)
                    .pipe(tap(i => {
                        this.id = i;
                        val.id = i;
                    }))
                : this.entitySrv.update(val);
            obs.subscribe({
                next: () => {
                    this.form.markAsUntouched();
                    this.snackBarSrv.showSuccessMessage();
                    // this.shellSrv.goBack();
                    this.cancel();
                },
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                }
            });
        } else {
            this.snackBarSrv.showFailureMessage('COMMON_INVALID_SELECTION');
        }
    }

    onDebitChange(value: string) {
        this.onAmountChange(+value, 'credit');
    }

    onCreditChange(value: string) {
        this.onAmountChange(+value, 'debit');
    }

    private onAmountChange(balance: number, ctrl: string) {
        if (balance > 0.0) {
            this.form.controls[ctrl].setValue(0);
            this.form.controls[ctrl].disable({onlySelf: true, emitEvent: false});
        } else {
            this.form.controls[ctrl].enable();
        }
    }
}


