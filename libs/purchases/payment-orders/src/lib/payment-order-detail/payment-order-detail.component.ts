import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {PaymentOrder} from '../payment-order';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { LookupsService, LotsService, PayModeService, Store } from "@ss/common/api-lookup";
import {PaymentOrderService} from '../payment-order.service';
import { IsParamService, LoginService } from "@ss/common/api-common";
import { Agent, AgentService, ConsumerService } from "@ss/logistics/api-agent";
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { Observable, switchMap, tap } from "rxjs";

@Component({
  selector: 'ss-payment-order-detail',
  templateUrl: './payment-order-detail.component.html',
  styleUrls: ['./payment-order-detail.component.scss']
})
export class PaymentOrderDetailComponent extends BaseEntityDetailComponent<PaymentOrder> {
    private isParamSrv = inject(IsParamService);
    private supplierSrv  = inject(AgentService);
    private consumerSrv = inject(ConsumerService);
    private storeSrv = inject(LotsService);
    private loginSrv  = inject(LoginService);
    private payModeSrv = inject(PayModeService);

    isBADR = false;
    supplierLookup = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');
    consumerLookup = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    storeLookup = new DefaultAutoCompleteModel<Store>(this.storeSrv);
    payModeLookup = new DefaultAutoCompleteModel(this.payModeSrv);

    constructor(
        public detailSrv: PaymentOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_PAYMENT_ORDERS');
    }

    override loadEntity(id: number): Observable<PaymentOrder> {
        return this.isParamSrv
          .is('BADR')
          .pipe(
            tap(b => this.isBADR = b),
            switchMap(() => super.loadEntity(id))
          );
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
            requesterId: [b.requesterId],
            payMode: [b.payMode],
            bankAccount: [b.bankAccount],
            bankAgency: [b.bankAgency],
            authorizationNo: [b.authorizationNo],
            authorizationDate: [b.authorizationDate],
        });
    }

}
