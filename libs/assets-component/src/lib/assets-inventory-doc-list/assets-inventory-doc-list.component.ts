import { Component, inject, signal } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { AssetInventoryDoc, CountSummary } from '../assets-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { AssetInventoryDocService } from '../services/asset-inventory-doc.service';
import {
    AssetRecordedInventoryReportComponent
} from '../asset-inventory-report/asset-recorded-inventory-report.component';
import {
    AssetUnidentifiedChildInventoryListComponent
} from '../asset-unidentified-child-inventory-list/asset-unidentified-child-inventory-list.component';
import { AssetCountSummaryService } from '../services/asset-count-summary.service';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import {callback} from "chart.js/helpers";

@Component({
    selector: 'ss-assets-inventory-doc-list',
    templateUrl: './assets-inventory-doc-list.component.html',
    styleUrls: ['./assets-inventory-doc-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        RouterModule,
        AssetRecordedInventoryReportComponent,
        AssetUnidentifiedChildInventoryListComponent,
        PaginationComponent
    ]
})
export class AssetsInventoryDocListComponent extends BaseEntityListComponent<AssetInventoryDoc> {
    #summarySrv = inject(AssetCountSummaryService);

    selectedTab = signal(0);
    displayedColumns = [
        'description',
        'creationDate',
        'locationDescription',
        'buildingDescription',
        'officeDescription',
        'closed'
    ];

    summaryData: CountSummary[] = [];
    summaryColumns = ['total', 'counted', 'missing', 'unidentified'];

    constructor(public override entitySrv: AssetInventoryDocService,
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
            'ASSET_INVENTORY_DOCUMENT');
        this.pagination.pageSize = 5;
    }

    onTab(e: number) {
        this.selectedTab.set(e);
    }

    override selectRow(row: AssetInventoryDoc) {
        super.selectRow(row);
        this.#summarySrv
            .get(row?.id||0)
            .subscribe(data => this.summaryData = data? [data] : []);
    }

    override excel() {
        this.entitySrv
            .workbook(this.selected||0)
            .subscribe(blob => {
                if (blob && blob.size > 100) {
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = this.entitySrv.constructor.name + '.xlsx';
                    link.click();
                    setTimeout(() => window.URL.revokeObjectURL(link.href), 5000);
                }
            });
    }

    override refresh(callback?: () => void) {
        this.selectRow(null);
        super.refresh(callback);
    }
}
//TODO ADD SEARCH BOX
