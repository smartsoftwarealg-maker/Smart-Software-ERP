import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {UnitsOfMeasure} from '@ss/master-data/api-article';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {MaterialModule, PaginatorPersistenceService} from '@ss/common/api-common';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from '@ss/common/ui-pagination';
import {UnitsService} from '../services/units.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-production-units-list',
    styleUrls: ['./production-units-list.component.scss'],
    templateUrl: './production-units-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        PaginationComponent,
        TranslatePipe,
    ],
})
export class UnitsListComponent
    extends BaseEntityListComponent<UnitsOfMeasure>
    implements OnInit
{
    displayedColumns = [
        'code',
        'name',
        'description',
        'unitType',
        // 'conversionFactor',
        'value',
        'isActive'
        ]

    constructor(
        public unitsSrv: UnitsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            unitsSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'PROD_UNITS_OF_MEASURE',
        );
    }

    override ngOnInit() {
        super.ngOnInit();
    }
}
