import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, PaginatorPersistenceService, UserService} from '@ss/common/api-common';
import {AgentService} from '@ss/logistics/api-agent';
import {InvoiceCancellationService} from '@ss/sales/api-invoice-cancellation';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseTransactionListComponent} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-delivery-list',
    templateUrl: './invoice-cancellation-list.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-list.scss'],
})
export class InvoiceCancellationListComponent extends BaseTransactionListComponent {

        displayedColumns = [
            'number',
            'date',
            'agent',
            'payMethod',
            'reference',
            'referenceDocDate',
        ];


        constructor(
            public invoiceSrv: InvoiceCancellationService,
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
            super(invoiceSrv, shellSrv, snackBarSrv, route, router, userSrv, agentSrv, langServ, confirmationSrv, defReportSrv, payMethodSrv, pagPersistSrv, 'SALES_INVOICE_CANCELLATION');
        }

}
