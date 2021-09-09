import {Component} from '@angular/core';
import {BaseEntityDetailComponent} from "@ss/common/ui-base-entity";
import {Payment} from "../services/payment.class";
import {AgentLookupModel, AgentService} from "@ss/logistics/api-agent";
import {LoginService} from "@ss/common/api-common";
import {LookupsService} from "@ss/common/api-lookup";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {PaymentsDetailService} from "../services/payments-detail.service";
import {PayModeService} from "../../../../api-logistics-common/src/lib/pay-mode.service";
import {BankService} from "@ss/administration/api-bank";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";

@Component({
  selector: 'ss-payments-detail',
  templateUrl: './payments-detail.component.html',
  styleUrls: ['./payments-detail.component.scss']
})
export class PaymentsDetailComponent extends BaseEntityDetailComponent<Payment> {
    public agentAutoCompleteModel    = new AgentLookupModel(this.agentService);
    public bankAutoCompleteModel    = new DefaultAutoCompleteModel(this.bankSrv);
    public modeAutoCompleteModel    = new DefaultAutoCompleteModel(this.typeSrv);

    constructor(
        private agentService: AgentService,
        private typeSrv: PayModeService,
        private loginSrv: LoginService,
        private bankSrv: BankService,
        public paymentSrv: PaymentsDetailService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(paymentSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_PAYMENTS');
    }

    setupForm(a: Payment): FormGroup {
        const db = a.amount > 0.0 ? a.amount : 0.0;
        const cr = a.amount < 0.0 ? -a.amount : 0.0;
        return this.formBuilder.group({
            id: [a.id],
            center: [a.center || this.loginSrv.appCtx.center],
            number: [a.number],
            bankId: [a.bankId],
            bank: [a.bank],
            description: [a.description, Validators.required],
            date: [a.date || new Date(), Validators.required],
            dueDays: [a.dueDays || 0, Validators.required],
            agent: [a.agent, Validators.required],
            debit: [{ value: db, disabled: cr > 0.000001}, Validators.required],
            credit: [{ value: cr, disabled: db > 0.000001}, Validators.required],
            mode: [a.mode || 2, Validators.required],
        })
    }

    readForm(): Payment {
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
        console.log(value);
        if (value > 0.0) {
            this.form.controls[ctrl].setValue(0);
            this.form.controls[ctrl].disable({onlySelf: true, emitEvent: false});
        } else {
            this.form.controls[ctrl].enable();
        }
     }
}
