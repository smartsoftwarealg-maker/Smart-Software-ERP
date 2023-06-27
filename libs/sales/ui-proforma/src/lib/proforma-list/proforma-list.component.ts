import { Component } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService, User, UserService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {SalesProformaService} from "../sales-proforma.service";
import { Transaction } from "@ss/logistics/api-transaction";
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-proforma',
    templateUrl: './proforma-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss']
})
export class ProformaListComponent  extends BaseEntityListComponent<Transaction> {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
    ];

    constructor(
        public proformaSrv: SalesProformaService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(proformaSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LOGISTICS_PROFORMA');
    }
}
