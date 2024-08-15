import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {DocStatus} from '../workflow-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {DocStatusService} from '../doc-status.service';
import { CommonModule } from '@angular/common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { RemunerationPaymonthEditorModule } from '@ss/remuneration/paymonth-editor';
import { CommonPayrollModule } from '@ss/payroll-common';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { OrgChartModule } from 'angular13-organization-chart';

@Component({
    selector: 'ss-user-message-list',
    templateUrl: './doc-status-list.component.html',
    styleUrls: ['./doc-status-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        UiPaginationModule,
        CommonUiLangModule,
        CommonUiAutoCompleteModule,
        RemunerationPaymonthEditorModule,
        CommonPayrollModule,
        CommonUiImageInputModule,
        OrgChartModule,
    ],
})
export class DocStatusListComponent extends BaseEntityListComponent<DocStatus> {
    displayedColumns = [
        'description',
        'msgLevel',
        'isFinal',
        'isPostFinal'
    ];

    constructor(
        public override entitySrv: DocStatusService,
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
            'ADMINISTRATION_WORKFLOW_MESSAGES');
    }
}
