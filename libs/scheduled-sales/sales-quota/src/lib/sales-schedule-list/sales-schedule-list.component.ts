import { Component, inject, OnInit } from "@angular/core";
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Schedule, ScheduleService} from '@ss/scheduled-sales/api-scheduled-sales';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LoginService, MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import {Agent, CustomerService} from '@ss/logistics/api-agent';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";

@Component({
    selector: 'ss-sales-schedule-list',
    templateUrl: './sales-schedule-list.component.html',
    styleUrls: ['./sales-schedule-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
    ],
})
export class SalesScheduleListComponent extends BaseEntityListComponent<Schedule> {
    private customerSrv = inject(CustomerService);
    private loginSrv = inject(LoginService);

    agentId = this.loginSrv.appCtx.agentId;
    agentFC = new FormControl<number>(this.loginSrv.appCtx.agentId || 0);
    public customerLookup = new DefaultAutoCompleteModel<Agent>(this.customerSrv, 'id', 'denomination')
    displayedColumns = [
        'serialNumber',
        'salesDate',
        'productRef',
        'productDescription',
        'qty',
        'price',
        'discount',
        'is_desktop'
    ];

    constructor(
        public override entitySrv: ScheduleService,
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
            'SCH_SCHEDULES');
        this.customerLookup.onObjectSelected = (a) => this.onAgent(a?.id);
        this.pagination.pageSize = 10;
    }

    override ngOnInit() {
        super.ngOnInit();
        if (this.agentId) {
            this.onAgent(this.agentId);
        }
    }

    onAgent(id?: number) {
        this.entitySrv.setParentId(id || 0);
        this.refresh();
    }
}
