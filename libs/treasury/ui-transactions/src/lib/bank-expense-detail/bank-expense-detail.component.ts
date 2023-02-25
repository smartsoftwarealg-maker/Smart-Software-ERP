import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {TreasuryBankExpenseService, TreasuryTransactionService, TTransaction} from '@ss/treasury/api-transactions';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AgentLookupModel, AgentService} from '@ss/logistics/api-agent';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService} from '@ss/common/api-common';
import {TreasuryGroupService} from '@ss/common/api-lookup';
import {MatRadioChange} from '@angular/material/radio';
import {Observable, of} from 'rxjs';

@Component({
    selector: 'ss-bank-expense-detail',
    templateUrl: './bank-expense-detail.component.html',
    styleUrls: ['./../transaction-detail/transaction-detail.component.scss'],
})
export class BankExpenseDetailComponent extends BaseEntityDetailComponent<TTransaction> {
    groupLookup = new DefaultAutoCompleteModel(this.groupSrv);
    agentLookup = new AgentLookupModel(this.agentSrv);

    constructor(
        public override entitySrv: TreasuryBankExpenseService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private agentSrv: AgentService,
        private loginSrv: LoginService,
        private groupSrv: TreasuryGroupService,
        private router: Router) {
            super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'TRS_BANK_EXPENSES');
    }

    override ngOnInit() {
        if (!this.entitySrv.journalId) {
            this.router.navigate(['/app/treasury/bank-expenses'])
        }
        super.ngOnInit();
    }

    setupForm(e: TTransaction): UntypedFormGroup {
        return this.formBuilder.group({
            id:            [e.id],
            description:   [e.description, Validators.required],
            centerId:      [e.centerId || this.loginSrv.appCtx.center],
            journalId:     [e.journalId || this.entitySrv.journalId],
            journalDesc:   [{ value: this.entitySrv.journalDescription, disabled: true}],
            transacDate:   [{ value: e.transacDate || this.entitySrv.date, disabled: true }],
            reference:     [{ value: e.reference, disabled: !this.entitySrv.isBank()}],
            reference2:    [{ value: e.reference2, disabled: !this.entitySrv.isBank()}],
            pieceno:       [e.pieceno, Validators.required],
            operationDate: [e.operationDate || 0],
            balance:       [e.balance],
            agent:         [e.agent],
            income:        [e.balance > 0? e.balance : 0],
            expense:       [e.balance > 0? 0 : -e.balance, Validators.min(0)],
            userId:        [e.userId || this.loginSrv.appCtx.id],
            paymode:       [e.paymode|| 1],
            bankExpenses:  [e.bankExpenses || true],
            treasuryGroup: [e.treasuryGroup],
            groupName:     [e.groupName    ],
            memo:          [e.memo         ],
        });
    }

    onAmount() {
        const income = +this.form.value['income'] || 0;
        const expense = +this.form.value['expense'] || 0;
        if (income >= 0 && expense >= 0) {
            this.form.controls['income'].enable({onlySelf: true});
            this.form.controls['expense'].enable({onlySelf: true});
            if (income - expense > 0.0) {
                this.form.controls['income'].enable({onlySelf: true});
                this.form.controls['expense'].disable({onlySelf: true});
            } else if (income - expense < 0) {
                this.form.controls['expense'].enable({onlySelf: true});
                this.form.controls['income'].disable({onlySelf: true});
            }
        }
    }

    override readForm(): TTransaction {
        const value = this.form.getRawValue();
        value.balance = - (value.expense || 0);
        value.journalId = this.entitySrv.journalId;
        value.bankExpenses = true;
        return value;
    }

    override canDeactivate(): Observable<boolean> {
        return this.form?.controls['expense']?.value < 0.1? of(false) : super.canDeactivate();
    }
}
