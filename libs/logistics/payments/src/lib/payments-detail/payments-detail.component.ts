import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {LookupsService, PayModeService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaymentsDetailService} from '../services/payments-detail.service';
import {BankService} from '@ss/administration/api-bank';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Payment} from '@ss/logistics/api-common';
import {AgentLookupModel, AgentService} from '@ss/logistics/api-agent';
import { MatCard, MatCardContent } from '@angular/material/card';

import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'ss-payments-detail',
    templateUrl: './payments-detail.component.html',
    styleUrls: ['./payments-detail.component.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, DatePickerComponent, UiAutoCompleteComponent, MatInput, MatError]
})
export class PaymentsDetailComponent extends BaseEntityDetailComponent<Payment> {
    private typeSrv  = inject(PayModeService);
    private loginSrv  = inject(LoginService);
    private bankSrv  = inject(BankService);
    private agentService = inject(AgentService);

    protected titleMap = new Map([
        ['/customers', 'LOGISTICS_CUSTOMER_PAYMENTS'],
        ['/suppliers', 'LOGISTICS_SUPPLIER_PAYMENTS'],
        ['/branches', 'LOGISTICS_BRANCH_PAYMENTS'],
        ['/transporters', 'LOGISTICS_TRANSPORTERS_PAYMENTS'],
    ]);

    displayedColumns = [
        'date',
        'denomination',
        'description',
        // 'modeDescription',
        'number',
        'debit',
        'credit',
    ];

    public agentAutoCompleteModel    = new AgentLookupModel(this.agentService);
    public bankAutoCompleteModel    = new DefaultAutoCompleteModel(this.bankSrv);
    public modeAutoCompleteModel    = new DefaultAutoCompleteModel(this.typeSrv);

    constructor(
        public paymentSrv: PaymentsDetailService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(paymentSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_PAYMENTS');
    }

    private updateAgentURL() {
        this.route.data
            .subscribe(data => {
                if (data['agents']) {
                    this.agentService.setURL(data['agents']);
                    this.shellSrv.setTitle(
                        this.titleMap.get(data['agents']) ?? 'COMMON_PAYMENTS',
                    );
                }
            });
    }

    override setupForm(a: Payment): UntypedFormGroup {
        this.updateAgentURL();
        const db = a.amount > 0.0 ? a.amount : 0.0;
        const cr = a.amount < 0.0 ? -a.amount : 0.0;
        return this.formBuilder.group({
            id:           [a.id],
            center:       [a.center || this.loginSrv.appCtx.center],
            number:       [a.number || '0'],
            bankId:       [a.bankId],
            bank:         [a.bank],
            description:  [a.description, Validators.required],
            date:         [a.date || new Date(), Validators.required],
            dueDays:      [a.dueDays || 0, Validators.required],
            agent:        [a.agent, Validators.required],
            debit:        [{ value: db, disabled: cr > 0.000001}, Validators.required],
            credit:       [{ value: cr, disabled: db > 0.000001}, Validators.required],
            mode:         [a.mode || 2, Validators.required],
            canceled:     [a.canceled],
            isAdvancement:[a.isAdvancement]
        });
    }

    override readForm(): Payment {
        const p =  super.readForm();
        p.amount = p['debit'] || 0 - p['credit'] || 0;
        p.debit = p.credit = null;
        p.center = this.loginSrv.appCtx.center;
        return p;
    }

    onDebitChange(event: Event) {
        this.onAmountChange('credit');
    }

    onCreditChange(event: Event) {
        this.onAmountChange('debit');
    }

    private onAmountChange(ctrl: string): void {
        const src = ctrl == 'debit' ? 'credit' : 'debit';
        const value = this.form.controls[src].value;
        if (value > 0.0) {
            this.form.controls[ctrl].setValue(0);
            this.form.controls[ctrl].disable({onlySelf: true, emitEvent: false});
        } else {
            this.form.controls[ctrl].enable();
        }
    }

}
