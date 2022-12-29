import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, PaginatorPersistenceService, User, UserService} from '@ss/common/api-common';
import {AgentService} from '@ss/logistics/api-agent';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PurchaseQuotationService} from "../purchase-quotation.service";
import {BaseTransactionListComponent} from "@ss/logistics/api-transaction";

@Component({
    selector: 'ss-quotation-list',
    templateUrl: './quotation-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss']
})
export class QuotationListComponent  extends BaseTransactionListComponent {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
    ];

    constructor(
        public quotationSrv: PurchaseQuotationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override userSrv: UserService,
        public override agentSrv: AgentService,
        public override langServ: LanguageService,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override payMethodSrv: PayMethodService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(quotationSrv, shellSrv, snackBarSrv, route, router, userSrv, agentSrv, langServ, confirmationSrv, defReportSrv, payMethodSrv, pagPersistSrv, 'PURCHASES_QUOTATION');
    }
}
