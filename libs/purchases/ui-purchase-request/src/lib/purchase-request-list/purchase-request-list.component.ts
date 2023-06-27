import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PurchaseRequestService} from '../purchase-request.service';
import { BaseEntityListComponent } from "@ss/common/ui-base-entity";
import { Transaction } from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-purchase-request-list',
    templateUrl: './purchase-request-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
})
export class PurchaseRequestListComponent  extends BaseEntityListComponent<Transaction> {
    displayedColumns = [
        'number',
        'date',
        'reference',
        'referenceDocDate',
        'dealerName',
        'docStatus'
    ];

    constructor(
        public orderSrv: PurchaseRequestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(orderSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'PURCHASES_PURCHASE_REQUEST');
    }
}
