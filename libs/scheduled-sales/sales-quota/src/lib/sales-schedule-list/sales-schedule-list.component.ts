import { Component, inject, OnInit, signal } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Schedule, ScheduleService} from '@ss/scheduled-sales/api-scheduled-sales';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import {Agent, CustomerService} from '@ss/logistics/api-agent';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { Observable, tap } from 'rxjs';

@Component({
    selector: 'ss-sales-schedule-list',
    templateUrl: './sales-schedule-list.component.html',
    styleUrls: ['./sales-schedule-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        PaginationComponent,
        UiAutoCompleteComponent,
        TranslatePipe
    ]
})
export class SalesScheduleListComponent extends BaseEntityListComponent<Schedule> {
    private customerSrv = inject(CustomerService);
    private loginSrv = inject(LoginService);

    agentId = signal(-1);
    agentFC = new FormControl<number>(this.agentId());
    public customerLookup = new DefaultAutoCompleteModel<Agent>(this.customerSrv, 'id', 'denomination');
    displayedColumns = [
        'serialNumber',
        'salesDate',
        'productRef',
        'productDescription',
        'qty',
        'price',
        'vat',
        'discount',
        'invoiceNo',
        'isPrinted',
        'canceled',
        // 'is_desktop'
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

    protected override preInit(): Observable<unknown> {
        return super.preInit()
            .pipe(tap(() => {
                this.agentId.set(this.loginSrv.appCtx.agentId || 0);
                this.editButton.visible = this.deleteButton.visible = this.addButton.visible = this.agentId() === 0;
            }));
    }

    override ngOnInit() {
        super.ngOnInit();
        this.agentFC.setValue(this.agentId());

        this.onAgent(this.entitySrv.getParentId() || 0);
    }

    onAgent(id?: number) {
        this.entitySrv.setParentId(id || 0);
        this.refresh();
    }
}
