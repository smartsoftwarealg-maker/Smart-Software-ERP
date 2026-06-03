import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {MaterialModule, PaginatorPersistenceService} from '@ss/common/api-common';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from '@ss/common/ui-pagination';
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from "@ss/common/ui-default-report-component";
import {TranslatePipe} from "@ss/common/ui-lang";
import {ActivityType} from "@ss/master-data/api-article";
import {ActivityTypesService} from "../services/types.service";

@Component({
    selector: 'ss-production-activity-types',
    templateUrl: './production-activity-types-list.component.html',
    styleUrls: ['./production-activity-types-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        PaginationComponent,
        TranslatePipe
    ]
})
export class ActivityTypesListComponent extends BaseEntityListComponent<ActivityType> implements OnInit {

    readonly displayedColumns = ([
        'code',
        'name',
        'description',
        'activityCategory',
        'unitOfMeasure',
        'isActive'
    ]);

    constructor(
        public srv: ActivityTypesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService
    ) {
        super(
            srv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'CRM_ACTIVITY_TYPE'
        );
    }
}
