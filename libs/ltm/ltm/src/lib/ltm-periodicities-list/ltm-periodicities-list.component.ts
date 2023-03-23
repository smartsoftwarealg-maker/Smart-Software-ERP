import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Lookup} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {LtmPeriodicityService} from '../ltm-periodicity.service';

@Component({
    selector: 'ss-ltm-periodicities-list',
    templateUrl: './ltm-periodicities-list.component.html',
    styleUrls: ['./ltm-periodicities-list.component.scss'],
})
export class LtmPeriodicitiesListComponent extends BaseEntityListComponent<Lookup> {

    displayedColumns = ['description', 'descriptionAr'];

    constructor(
        public override entitySrv: LtmPeriodicityService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LTM_PERIODICITIES');
    }
}
