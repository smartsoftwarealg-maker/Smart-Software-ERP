import { Component, inject, signal } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { AssetInventoryDoc, CountSummary } from '../assets-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginationModel, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';

import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';

import { QRCodeModule } from 'angularx-qrcode';
import { AssetInventoryDocService } from '../services/asset-inventory-doc.service';
import {
    AssetRecordedInventoryReportComponent
} from '../asset-inventory-report/asset-recorded-inventory-report.component';
import {
    AssetUnidentifiedChildInventoryListComponent
} from '../asset-unidentified-child-inventory-list/asset-unidentified-child-inventory-list.component';
import { AssetCountSummaryService } from '../services/asset-count-summary.service';

@Component({
    selector: 'ss-assets-inventory-doc-list',
    templateUrl: './assets-inventory-doc-list.component.html',
    styleUrls: ['./assets-inventory-doc-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,

        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,

        QRCodeModule,
        AssetRecordedInventoryReportComponent,
        AssetUnidentifiedChildInventoryListComponent
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

    constructor(public listSrv: AssetInventoryDocService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override defReportSrv: DefaultReportService,
                public override confirmationSrv: ConfirmationDialogService,
                public override pagPersistSrv: PaginatorPersistenceService) {
        super(listSrv,
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
            .get(row.id)
            .subscribe(data => this.summaryData = [data]);
    }
}
