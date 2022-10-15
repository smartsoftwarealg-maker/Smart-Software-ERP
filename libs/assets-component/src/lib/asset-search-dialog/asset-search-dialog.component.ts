import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Asset} from '../assets-api';
import {AssetsService} from '../assets.service';
import {UntypedFormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {PaginationModel} from '@ss/common/api-common';

@Component({
    selector: 'ss-asset-search-dialog',
    templateUrl: './asset-search-dialog.component.html',
    styleUrls: ['./asset-search-dialog.component.scss']
})
export class AssetSearchDialogComponent implements OnInit {
    readonly pagination = PaginationModel.newInstance();
    selectedId: number = null;
    assetList: Asset[] = [];
    selectedAsset: Asset = {
        id: 0,
        description: 'No selection',
        centerId: 0,
        accountno: '',
        acquisitionValue: 0,
        reference: '',
        historicValue: 0,
        vat: 0,
        residualValue: 0,
        useful_life: 0,
        old_depreciation: 0,
        outOfService: false
    };
    displayedColumns = ['reference', 'description'];
    searchText = new UntypedFormControl();

    constructor(public dialogRef: MatDialogRef<AssetSearchDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Asset,
                private assetSrv: AssetsService) {
        this.pagination.onChange = () => this.refresh(this.searchText.value || '');
    }

    ngOnInit(): void {
        this.searchText
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(v => this.refresh(v));
        this.assetSrv
            .soldOut(0, this.searchText.value || '')
            .subscribe(res => {
                this.assetList = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }

    close() {
        this.dialogRef.close();
    }

    private refresh(value: string) {
        this.assetSrv
            .soldOut(this.pagination.page - 1, this.searchText.value || '')
            .subscribe(res => {
                this.assetList = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }

    select(asset: Asset) {
        this.selectedAsset = asset;
        this.selectedId = asset?.id;
    }
}
