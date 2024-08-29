import { Component, inject } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {SSProject} from '@ss/scheduled-sales/api-scheduled-sales';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {ProjectService} from '../project.service';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { Agent, CustomerService } from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
})
export class ProjectListComponent extends BaseEntityListComponent<SSProject> {
    private customerSrv = inject(CustomerService);

    displayedColumns = [
        'description',
        'project_code',
        'start_date',
        'finish_date',
        'qty'
    ];
    public customerLookup = new DefaultAutoCompleteModel<Agent>(this.customerSrv, 'id', 'denomination')
    agentFC = new FormControl<number>(0);

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
        if (!this.entitySrv.getParentId() || this.entitySrv.getParentId() < 1) {
            this.entitySrv.setParentId(0);
        }
        this.agentFC.setValue(this.entitySrv.getParentId()||0);
        this.customerLookup.onObjectSelected = a => this.onAgent(a);
        this.pagination.pageSize = 10;
    }

    private onAgent(a: Agent) {
        this.entitySrv.setParentId(a?.id||0);
        this.editButton.disabled = this.addButton.disabled = (a?.id||0) < 1;
        this.refresh();
    }
}
