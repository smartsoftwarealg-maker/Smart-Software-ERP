import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {
    AccPoliciesService,
    ACCPolicy,
    ACCTransactionLine,
    AccTransactionLineService,
    AnnexCodeService
} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {LoginService} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {Account, AccountAutocompleteModel, AccountService} from '@ss/accounting/api-accounts';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AgentService, CustomerService} from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-transaction-lines-detail',
    templateUrl: './transaction-lines-detail.component.html',
    styleUrls: ['./transaction-lines-detail.component.scss']
})
export class TransactionLinesDetailComponent {
    accountLookupModel  = new AccountAutocompleteModel(this.accountSrv);
    customerLookupModel = new DefaultAutoCompleteModel(this.customerSrv, 'id', 'denomination');
    annexCodeLookupMode = new DefaultAutoCompleteModel(this.annexCodeSrv, 'code');
    accPolicy: ACCPolicy = null;
    public form: FormGroup = null;
    id = 0;
    transactionId = 0;
    fileId = 0;
    selectedAccount: Account = null;

    constructor(
        public entitySrv: AccTransactionLineService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private accountSrv: AccountService,
        private customerSrv: AgentService,
        private loginSrv: LoginService,
        private annexCodeSrv: AnnexCodeService,
        private accPolicySrv: AccPoliciesService) {
        this.accountLookupModel.onObjectSelected = (obj) => this.accountSelected(obj)
    }

    setupForm(e: ACCTransactionLine): FormGroup {
        return  this.formBuilder.group({
            id: [((e.fileId * 10000 + e.oid) * 10000 + e.lineNumber) || 0],
            fileId: [e.fileId || this.loginSrv.appCtx.accFile],
            oid: [e.oid || this.transactionId],
            accountNo: [e.accountNo, Validators.required],
            customer: [e.customer, Validators.required],
            lineNumber: [e.lineNumber || 1],
            c_o_d: [e.c_o_d],
            balance: [e.balance],
            debit: [{ value: e.balance > 0? e.balance : 0.0, disabled: e.balance < 0 }],
            credit: [{ value: e.balance < 0? -e.balance : 0.0, disabled: e.balance > 0 } ],
            reference: [e.reference],
            checkNo: [e.checkNo],
            description: [e.description, Validators.required],
            customerId: [e.customerId],
            accountId: [e.accountId],
        }, { validators: formValidator });
        // form.setValidators(this.formValidator);
    }

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
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
            const a: any = {
                id: 0
            };
            return of(a);
        }
        return this.entitySrv.get(id);
    }

    public finishLoading(e: ACCTransactionLine) {
        this.shellSrv.setLoading(false);
        this.form = this.setupForm(e);
    }

    public load() {
        this.shellSrv.setLoading(true);
        this.loginSrv
            .loadContext()
            .pipe(
                switchMap(_ => this.accPolicySrv.get(this.loginSrv.appCtx.center)),
                tap(pol => this.accPolicy = pol),
                switchMap(_ => this.route.parent.params),
                tap(p => {
                    const id = +p['id'];
                    this.entitySrv.setParentId(id);
                    this.transactionId = id % 10000;
                    this.fileId = +(id / 10000).toFixed(0);
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
        this.shellSrv.goBack();
    }

    save() {
        const val = this.form.value;
        val.balance = val.debit || 0 - val.credit || 0;
        delete val.debit;
        delete val.credit;
        if (this.entitySrv.getParentId() != null) {
            val.id = this.id;
            let obs: Observable<any> = val.id === 0
                ? this.entitySrv.add(val).pipe(tap(i => {
                    this.id = i;
                    val.id = i;
                }))
                : this.entitySrv.update(val);
            obs.subscribe({
                next: () => {
                    this.form.markAsUntouched();
                    this.snackBarSrv.showSuccessMessage();
                    this.shellSrv.goBack();
                },
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                }
            })
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

export const formValidator: ValidatorFn =
    (group: AbstractControl): ValidationErrors | null => {
        console.log('*******customer id ', group.get('customerId').value);
        if (!group.get('customerId').value) {
            console.log('customer id is invalid')
            group.get('customerId').setErrors({ invalid: true })
        }
        return { invalid: true };
    }

