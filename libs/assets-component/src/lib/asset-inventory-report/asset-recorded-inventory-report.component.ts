import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import {
    AssetInventoryDoc,
    InventoryAsset
} from '../assets-api';
import { RouterModule } from '@angular/router';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';
import { AssetRecordedInventoryService } from '../services/asset-recorded-inventory.service';
import { Sort } from '@angular/material/sort';

@Component({
    selector: 'ss-asset-recorded-inventory-report',
    templateUrl: './asset-recorded-inventory-report.component.html',
    styleUrls: ['./asset-recorded-inventory-report.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        AppArchiveModule,
        QRCodeModule
    ]
})
export class AssetRecordedInventoryReportComponent implements OnInit {
    private listSrv = inject(AssetRecordedInventoryService);

    documentId = input<AssetInventoryDoc>(null);
    recorded   = input<boolean>(false);
    selectedRow: InventoryAsset|null = null;
    selected = 0;
    data: InventoryAsset[] = [];
    displayedColumns = [
        'reference',
        'description',
        'serialNo',
        'locationDescription',
        'buildingDescription',
        'officeDescription',
        'acquisitionDate',
        'receptionNumber',
        'assignmentNo',
        'date',
        'userDescription',
        'newBuildingDescription',
        'newOfficeDescription',
        'newBeneficiaryDescription',
        'comment',
    ];
    pagination = PaginationModel.newInstance({pageSize: 5, page: 1, elementCount: 0});

    constructor() {
        effect(() => {
            this.onDocument(this.documentId());
        });
        effect(() => {
            this.onMode(this.recorded());
        });
        this.pagination.onChange = () => this.refresh();
    }
    onDocument(d: AssetInventoryDoc) {
        this.listSrv.document = d;
        this.refresh();
    }

    onMode(b: boolean) {
        this.listSrv.recorded = b;
        this.refresh();
    }

    private refresh() {
        this.listSrv
            .getPage(this.pagination, null)
            .subscribe(res => this.data = res);
    }

    sort(event: Sort) {
        this.listSrv.sortColumn = event;
        this.refresh();
    }

    selectRow(row: InventoryAsset) {
        this.selectedRow = row;
        this.selected = row?.id;
    }

    ngOnInit() {
        this.data = [];
        this.refresh();
    }
}
