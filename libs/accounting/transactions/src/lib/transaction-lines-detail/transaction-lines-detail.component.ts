import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ACCTransactionLine, AccTransactionLineService} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {LoginService} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {AccountAutocompleteModel, AccountService} from '@ss/accounting/api-accounts';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AgentService, CustomerService} from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-transaction-lines-detail',
    templateUrl: './transaction-lines-detail.component.html',
    styleUrls: ['./transaction-lines-detail.component.scss']
})
export class TransactionLinesDetailComponent {
    accountAutoCompleteModel  = new AccountAutocompleteModel(this.accountSrv);
    customerAutoCompleteModel = new DefaultAutoCompleteModel(this.customerSrv, 'id', 'denomination');
    public form: FormGroup = null;
    id = 0;

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
        private loginSrv: LoginService) {
    }

    setupForm(e: ACCTransactionLine): FormGroup {
        return this.formBuilder.group({
            id: [((e.fileId * 10000 + e.oid) * 10000 + e.lineNumber) || 0],
            oid: [e.oid],
            accountNo: [e.accountNo, Validators.required],
            customer: [e.customer, Validators.required],
            lineNumber: [e.lineNumber],
            c_o_d: [e.c_o_d],
            balance: [e.balance],
            debit: [e.balance > 0? e.balance : 0.0],
            credit: [e.balance > 0? -e.balance : 0.0],
            reference: [e.reference],
            checkNo: [e.checkNo],
            description: [e.description],
            customerId: [e.customerId],
            accountId: [e.accountId],
            fileId: [e.fileId || this.loginSrv.appCtx.accYear],
        });
    }

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
        this.load();
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
                switchMap(_ => this.route.parent.params),
                tap(res => console.log('res', res['id'])),
                tap(p => this.entitySrv.setParentId(+p['id'])),
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
        console.log('**********id', this.entitySrv.getParentId())
        const val = this.form.value;
        val.balance = val.debit - val.credit;
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

}
