import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, UserService} from '@ss/common/api-common';
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
            public shellSrv: ShellService,
            public snackBarSrv: SnackBarService,
            public route: ActivatedRoute,
            public router: Router,
            public userSrv: UserService,
            public agentSrv: AgentService,
            public langServ: LanguageService,
            public confirmationSrv: ConfirmationDialogService,
            public defReportSrv: DefaultReportService,
            public payMethodSrv: PayMethodService) {
            super(invoiceSrv, shellSrv, snackBarSrv, route, router, userSrv, agentSrv, langServ, confirmationSrv, defReportSrv, payMethodSrv, 'SALES_INVOICE_CANCELLATION');
        }

}
