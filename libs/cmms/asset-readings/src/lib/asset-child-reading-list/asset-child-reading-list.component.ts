import { Component, inject, OnInit } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CMMSAssetReadingService } from '../cmms-asset-reading.service';
import {  DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { AssetsService } from '@ss/assets-component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AssetReading } from '@ss/cmms/cmms-api';
import { CommonModule } from '@angular/common';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-asset-reading-list',
    templateUrl: './asset-child-reading-list.component.html',
    styleUrls: ['./asset-child-reading-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,

        MatSortModule,
        MatTableModule,

        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        DatePickerComponent,

        MatButtonModule,
        MaterialModule,
        TranslatePipe,
        PaginationComponent
    ]
})
export class AssetChildReadingListComponent extends BaseChildEntityListComponent<AssetReading> implements OnInit {
    private assetSrv = inject(AssetsService);

    assetLookup = new DefaultAutoCompleteModel(this.assetSrv);
    assetCtrl = new FormControl<number>(0);

    override displayedColumns = [
        'meterDescription',
        'date',
        'amount'
    ];

    constructor(
        public override detailSrv: CMMSAssetReadingService) {
        super(detailSrv, 'AssetReading');
    }
}
