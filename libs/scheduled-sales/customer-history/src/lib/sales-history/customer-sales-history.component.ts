import { Component, inject } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { SalesHistoryService } from './sales-history.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
export class CustomerSalesHistoryComponent extends BaseEntityListComponent<SalesRecord> {
    private TODAY = new Date();
    private loginSrv = inject(LoginService);
    private fb = inject(FormBuilder);

    searchForm = this.fb.group({
        search: [''],
        from:   [this.TODAY, Validators.required],
        to:     [this.TODAY, Validators.required],
    });

    displayedColumns = [
        'date',
        'number',
        'product',
        'qty',
        'price',
        'transporter',
        'licenseNo',
        'plateNumber'
    ];

    constructor(
        public override entitySrv: SalesHistoryService,
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
            'COMMON_HISTORY');
        this.pagination.pageSize = 10;
    }

    protected override canShowProcessingStatus(): boolean {
        return false;
    }

    override ngOnInit() {
        this.editButton.visible = this.addButton.visible = this.deleteButton.visible = false;
        super.ngOnInit();
        this.shellSrv.disableSearch();
        this.entitySrv.setParentId(this.loginSrv.appCtx.agentId || 0);
        const lastYear = new Date();
        lastYear.setFullYear(this.TODAY.getFullYear() - 1);
        this.searchForm.controls.from.setValue(lastYear);

        this.subscriptions.push(
            this.searchForm
                .valueChanges
                .pipe(debounceTime(300),
                      distinctUntilChanged())
                .subscribe(res => {
                    this.entitySrv.from = this.searchForm.controls.from.value;
                    this.entitySrv.to = this.searchForm.controls.to.value;
                    this.entitySrv.searchStr = this.searchForm.controls.search.value;
                    this.refresh();
                })
        );
    }
}
