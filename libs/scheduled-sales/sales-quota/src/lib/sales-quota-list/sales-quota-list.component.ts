import { Component, inject } from "@angular/core";
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Quota} from '@ss/scheduled-sales/api-scheduled-sales';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LoginService, MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import {SSQuotaService} from '@ss/scheduled-sales/api-scheduled-sales';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import { Agent, CustomerService } from "@ss/logistics/api-agent";

@Component({
    selector: 'ss-sales-quota-list',
    templateUrl: './sales-quota-list.component.html',
    styleUrls: ['./sales-quota-list.component.scss'],
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
export class SalesQuotaListComponent extends BaseEntityListComponent<Quota> {
    private customerSrv = inject(CustomerService);
    private loginSrv = inject(LoginService);

    agentId = this.loginSrv.appCtx.agentId;
    agentFC = new FormControl<number>(this.loginSrv.appCtx.agentId || 0);
    public customerLookup = new DefaultAutoCompleteModel<Agent>(this.customerSrv, 'id', 'denomination')

    displayedColumns = [
        'salesDate',
        'reference',
        'customerCode',
        'customerName',
        'description',
        'qty',
    ];

    constructor(
        public override entitySrv: SSQuotaService,
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
            'SCH_QUOTAS');
        this.pagination.pageSize = 10;
        this.customerLookup.onObjectSelected = (a) => this.onAgent(a?.id);
    }

    override ngOnInit() {
        this.editButton.visible = this.deleteButton.visible = this.addButton.visible = !this.agentId;
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
