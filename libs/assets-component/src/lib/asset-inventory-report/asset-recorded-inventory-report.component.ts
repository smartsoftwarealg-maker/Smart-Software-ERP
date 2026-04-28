import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import {
    AssetInventoryDoc,
    InventoryAsset
} from '../assets-api';
import { RouterModule } from '@angular/router';

import { MaterialModule, PaginationModel } from '@ss/common/api-common';

import { CommonModule } from '@angular/common';


import { AssetRecordedInventoryService } from '../services/asset-recorded-inventory.service';
import { Sort } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
    selector: 'ss-asset-recorded-inventory-report',
    templateUrl: './asset-recorded-inventory-report.component.html',
    styleUrls: ['./asset-recorded-inventory-report.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        RouterModule,
        PaginationComponent
    ]
})
export class AssetRecordedInventoryReportComponent implements OnInit {
    private listSrv = inject(AssetRecordedInventoryService);
    isEditable = true;
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

    filter = new FormControl('');
    loading = signal(true);

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
        this.loading.set(true);
        this.listSrv
            .getPage(this.pagination, this.filter.getRawValue())
            .subscribe(res => {
                this.data = res;
                this.loading.set(false);
            });
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
        this.filter.valueChanges
            .pipe(
                debounceTime(300),         // wait 300ms after the user stops typing
                distinctUntilChanged()      // only refresh if the value actually changed
            )
            .subscribe(() => {
                this.refresh();
            });
        this.refresh();
    }

    update(e: InventoryAsset) {
        //TODO: find implementation
    }
}
