import { Component } from '@angular/core';
import { Lookup } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialActivityService } from '../services/social-activity.service';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-activities-list',
    templateUrl: './list-template/cmms-fault-list.component.html',
    styleUrls: ['./list-template/cmms-fault-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule
    ],
})
export class ActivityListComponent extends BaseEntityListComponent<Lookup> {
    displayedColumns = ['description', 'descriptionAr'];
    constructor(
        public override entitySrv: SocialActivityService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'PAYROLL_ACTIVITIES');
    }
}
