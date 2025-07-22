import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {TreasuryTransactionService, TTransaction} from '@ss/treasury/api-transactions';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { TreasuryGroupService } from '@ss/common/api-lookup';
import { dateToStr, LoginService, MaterialModule } from '@ss/common/api-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AgentLookupModel, AgentService} from '@ss/logistics/api-agent';
import {filter} from 'rxjs/operators';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'ss-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MaterialModule,
        MatCardContent,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        DatePickerComponent,
        MatError,
        UiAutoCompleteComponent,
        MatCheckbox,
        RouterOutlet,
    ],
})
export class TransactionDetailComponent extends BaseEntityDetailComponent<TTransaction> {
    private agentSrv = inject(AgentService);
    private groupSrv = inject(TreasuryGroupService);
    groupLookup = new DefaultAutoCompleteModel(this.groupSrv);
    agentLookup = new AgentLookupModel(this.agentSrv);

    constructor(
        public override entitySrv: TreasuryTransactionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private loginSrv: LoginService,
        private router: Router) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_TRANSACTIONS');
    }

    override ngOnInit() {
        if (!this.entitySrv.journalId) {
            this.router.navigate(['/app/treasury/transactions']).then();
        }
        this.subscriptions.push(
            this.router
                .events
                .pipe(filter(event => event instanceof NavigationEnd))
                .subscribe(event => {
                    if (event instanceof NavigationEnd) {
                        this.saveButton.visible = event.url.indexOf('/lines/') < 0;
                    }
                }));

        super.ngOnInit();
    }

    setupForm(e: TTransaction): UntypedFormGroup {
        return this.formBuilder.group({
            id:            [e.id],
            description:   [e.description, Validators.required],
            centerId:      [e.centerId || this.loginSrv.appCtx.center],
            journalId:     [e.journalId || this.entitySrv.journalId],
            journalDesc:   [{ value: this.entitySrv.journalDescription, disabled: true}],
            transacDate:   [{ value: e.transacDate || this.entitySrv.date, disabled: false }],
            reference:     [{ value: e.reference, disabled: !this.entitySrv.isBank()}],
            reference2:    [{ value: e.reference2, disabled: !this.entitySrv.isBank()}],
            pieceno:       [e.pieceno, Validators.required],
            operationDate: [e.operationDate || 0],
            balance:       [e.balance],
            agent:         [e.agent],
            income:        [{ value: e.balance > 0? e.balance : 0, disabled: e.balance < 0 }],
            expense:       [{ value: e.balance > 0? 0 : -e.balance, disabled: e.balance > 0 }],
            userId:        [e.userId || this.loginSrv.appCtx.id],
            paymode:       [e.paymode|| 1],
            bankExpenses:  [{ value: e.bankExpenses, disabled: e.balance > 0 } ],
            treasuryGroup: [e.treasuryGroup],
            groupName:     [e.groupName    ],
            memo:          [e.memo         ],
        });
    }

    onAmount() {
        const income = +this.form.value['income'] || 0;
        const expense = +this.form.value['expense'] || 0;
        this.form.controls['income'].enable({ onlySelf: true });
        this.form.controls['expense'].enable({ onlySelf: true });
        if (income - expense > 0.0) {
            this.form.controls['income'].enable({ onlySelf: true });
            this.form.controls['expense'].disable({ onlySelf: true });
            this.form.controls['bankExpenses'].disable({ onlySelf: true });
            this.form.controls['bankExpenses'].setValue(0.0);
        } else if (income - expense < 0) {
            this.form.controls['expense'].enable({ onlySelf: true });
            this.form.controls['income'].disable({ onlySelf: true });
            this.form.controls['bankExpenses'].enable({ onlySelf: true });
        }
    }

    // onMode(e: MatRadioChange) {
    //     this.form.controls['paymode'].setValue(e.value);
    //     if (e.value === this.entitySrv.BANK) {
    //         this.form.controls['reference'].enable({ onlySelf: false });
    //         this.form.controls['reference2'].enable({ onlySelf: false });
    //     } else {
    //         this.form.controls['reference'].disable({ onlySelf: true });
    //         this.form.controls['reference2'].disable({ onlySelf: true });
    //     }
    // }

    override readForm(): TTransaction {
        const value = this.form.getRawValue();
        console.log(value.transacDate);
        value.transacDate = dateToStr(value.transacDate ? value.transacDate : this.entitySrv.date);
        value.balance = (value.income ||0) - (value.expense || 0);
        value.journalId = this.entitySrv.journalId;
        if (!this.entitySrv.isBank()) {
            value.reference = new Date().getTime().toString(16);
        }
        return value;
    }
}
