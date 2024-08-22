import { Component, effect, inject, input, OnInit } from '@angular/core';
import { UnidentifiedInventory } from '../assets-api';
import { RouterModule } from '@angular/router';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';
import { AssetUnidentifiedInventoryService } from '@ss/assets-component';

@Component({
    selector: 'ss-asset-unidentified-child-inventory-list',
    templateUrl: './asset-unidentified-child-inventory-list.component.html',
    styleUrls: ['./asset-unidentified-child-inventory-list.component.scss'],
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
export class AssetUnidentifiedChildInventoryListComponent  implements OnInit {
    pagination = PaginationModel.newInstance({
        page: 1,
        pageSize: 5,
        elementCount: 0
    });
    entitySrv = inject(AssetUnidentifiedInventoryService);

    displayedColumns = [
        'creationDate',
        'buildingDescription',
        'classDescription',
        'count'
    ];
    selected = 0;
    data: UnidentifiedInventory[] = [];
    documentId = input(0);

    constructor() {
        this.pagination.onChange = () => this.refresh();
        effect(() => {
            this.entitySrv.setParentId(this.documentId());
            this.refresh();
        });
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.entitySrv
            .getPage(this.pagination)
            .subscribe(res => this.data = res);
    }

    select(id: number) {
        this.selected = id;
    }
}
