import { Component, effect, inject, input, OnInit } from '@angular/core';
import { UnidentifiedInventory } from '../assets-api';
import { RouterModule } from '@angular/router';

import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';



import {  DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { DatePickerComponent } from '@ss/common/ui-datepicker';



import { AssetUnidentifiedInventoryService } from '@ss/assets-component';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
    selector: 'ss-asset-unidentified-child-inventory-list',
    templateUrl: './asset-unidentified-child-inventory-list.component.html',
    styleUrls: ['./asset-unidentified-child-inventory-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        RouterModule,
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
    filter = new FormControl('');

    displayedColumns = [
        'creationDate',
        'buildingDescription',
        'classDescription',
        'count',
        'serialNo',
        'classDescription',
        'officeDescription',
        'beneficiaryDescription',
        'memo'
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
        this.filter.valueChanges
            .pipe(
                debounceTime(300),         // wait 300ms after the user stops typing
                distinctUntilChanged()      // only refresh if the value actually changed
            )
            .subscribe(() => {
                this.refresh();
            });
    }

    refresh() {
        this.entitySrv
            .getPage(this.pagination, this.filter.getRawValue())
            .subscribe(res => this.data = res);
    }

    select(id: number) {
        this.selected = id;
    }
}
