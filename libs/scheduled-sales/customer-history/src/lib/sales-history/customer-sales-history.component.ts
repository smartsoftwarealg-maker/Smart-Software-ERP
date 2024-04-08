import { Component, inject } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { LogisticsUiDocImportModule } from "@ss/logistics/ui-doc-import";
import { LogisticsUiStockInfoModule } from "@ss/logistics/ui-stock-info";
import { CommonUiImageInputModule } from "@ss/common/ui-image-input";
import { CommonUiColorSelectModule } from "@ss/common/ui-color-select";
import { ColorPickerModule } from "ngx-color-picker";
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { SalesRecord } from '@ss/scheduled-sales/api-scheduled-sales';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { BudgetPlanningService } from '@ss/budget/budget-planning';
import { SalesHistoryService } from './sales-history.service';

@Component({
    selector: 'ss-customer-history',
    templateUrl: './customer-sales-history.component.html',
    styleUrls: ['./customer-sales-history.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiDocInfoModule,
        LogisticsUiDocImportModule,
        LogisticsUiStockInfoModule,
        CommonUiImageInputModule,
        CommonUiColorSelectModule,
        ColorPickerModule
    ]
})
export class CustomerBalanceComponent extends BaseEntityListComponent<SalesRecord> {
    private loginSrv = inject(LoginService);

    displayedColumns = [
        'date',
        'number',
        // 'product',
        // 'qty',
        // 'price',
        // 'transporter',
        // 'licenseNo',
        // 'plateNumber'
    ];

    constructor(
        public override entitySrv: SalesHistoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private planningSrv: BudgetPlanningService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_HISTORY');
        this.pagination.pageSize = 10;
        this.planningSrv.setParentId(this.loginSrv.appCtx.agentId || 0);
    }
}
