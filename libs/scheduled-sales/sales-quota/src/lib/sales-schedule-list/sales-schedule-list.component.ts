import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Schedule, ScheduleService} from '@ss/scheduled-sales/api-scheduled-sales';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, CustomerService} from '@ss/logistics/api-agent';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'ss-sales-schedule-list',
    templateUrl: './sales-schedule-list.component.html',
    styleUrls: ['./sales-schedule-list.component.scss'],
})
export class SalesScheduleListComponent extends BaseEntityListComponent<Schedule> {
    agentFC = new FormControl<number>(0);
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
        public override pagPersistSrv: PaginatorPersistenceService,
        private customerSrv: CustomerService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'SCH_SCHEDULES');
        this.customerLookup.onObjectSelected = (a) => this.onAgent(a);
        this.pagination.pageSize = 10;
        this.agentFC.setValue(this.entitySrv.getParentId());
    }

    onAgent(a: Agent) {
        this.entitySrv.setParentId(a?.id || 0);
        this.refresh();
    }
}
