import { Component, effect, inject, input, OnInit } from '@angular/core';
import { UnidentifiedInventory } from '../assets-api';
import { RouterModule } from '@angular/router';

import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';



import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';

import { QRCodeModule } from 'angularx-qrcode';
import { AssetUnidentifiedInventoryService } from '@ss/assets-component';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-asset-unidentified-child-inventory-list',
    templateUrl: './asset-unidentified-child-inventory-list.component.html',
    styleUrls: ['./asset-unidentified-child-inventory-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,

        QRCodeModule,
        PaginationComponent
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
