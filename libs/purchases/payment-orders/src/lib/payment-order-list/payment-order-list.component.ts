import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {PaymentOrder} from '../payment-order';
import {BankService} from '@ss/administration/api-bank';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {PaymentOrderService} from '../payment-order.service';

@Component({
  selector: 'ss-payment-order-list',
  templateUrl: './payment-order-list.component.html',
  styleUrls: ['./payment-order-list.component.scss']
})
export class PaymentOrderListComponent extends BaseEntityListComponent<PaymentOrder> {
    displayedColumns = [
        'ord_number',
        'ord_date',
        'supplierName',
        'description',
        'invoice_number',
        'invoice_date',
        'amount'
    ];

    constructor(
        public listSrv: PaymentOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(listSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LOGISTICS_PAYMENT_ORDERS');
    }

}
