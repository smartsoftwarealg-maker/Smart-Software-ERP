import {Component} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {SSProject} from '@ss/scheduled-sales/api-scheduled-sales';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {ProjectService} from '../project.service';

@Component({
    selector: 'ss-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent extends BaseEntityListComponent<SSProject> {

    displayedColumns = [
        'description',
        'project_code',
        'start_date',
        'finish_date',
        'qty'
    ];

    constructor(
        public override entitySrv: ProjectService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_PROJECTS');
        this.pagination.pageSize = 10;
    }
}
