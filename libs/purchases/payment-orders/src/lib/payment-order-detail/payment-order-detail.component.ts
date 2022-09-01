import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {PaymentOrder} from '../payment-order';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {PaymentOrderService} from '../payment-order.service';
import {LoginService} from '@ss/common/api-common';
import {Agent, AgentService, SupplierService} from '@ss/logistics/api-agent';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';

@Component({
  selector: 'ss-payment-order-detail',
  templateUrl: './payment-order-detail.component.html',
  styleUrls: ['./payment-order-detail.component.scss']
})
export class PaymentOrderDetailComponent extends BaseEntityDetailComponent<PaymentOrder> {
    supplierAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination')

    constructor(
        public detailSrv: PaymentOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private supplierSrv: SupplierService,
        private loginSrv: LoginService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_PAYMENT_ORDERS');
    }

    setupForm(b: PaymentOrder): UntypedFormGroup {
        return this.formBuilder.group({
            id: [b.id],
            ord_number: [b.ord_number || 0],
            description: [b.description, Validators.required],
            ord_date: [b.ord_date, Validators.required],
            agent_id: [b.agent_id, Validators.required],
            vat: [b.vat || 0],
            amount: [b.amount || 0, Validators.required],
            invoice_number: [b.invoice_number, Validators.required],
            invoice_date: [b.invoice_date, Validators.required],
            center_id: [b.center_id || this.loginSrv.appCtx.center, Validators.required],
        });
    }

}
