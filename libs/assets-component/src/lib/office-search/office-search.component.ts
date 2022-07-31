import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Office, OfficeService} from '@ss/common/api-lookup';
import {AssetLocationService} from '../asset-location.service';
import {AssetsBuildingService} from '../assets-building.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'ss-office-search',
  templateUrl: './office-search.component.html',
  styleUrls: ['./office-search.component.scss']
})
export class OfficeSearchComponent implements OnDestroy, OnInit {
    subscriptions: Subscription[] = [];
    selectedOffice: Office | null = null;
    locationLookup = new DefaultAutoCompleteModel(this.locationSrv);
    buildingLookup = new DefaultAutoCompleteModel(this.buildingSrv);

    locationFF = new FormControl(0);
    buildingFF = new FormControl(0);
    floorFF    = new FormControl(0);
    list: Office[] = [];

    constructor(public dialogRef: MatDialogRef<OfficeSearchComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Office,
                private officeSrv: OfficeService,
                private locationSrv: AssetLocationService,
                private buildingSrv: AssetsBuildingService) {
    }

    close() {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    ngOnInit(): void {
        this.subscriptions
            .push(
                this.locationFF
                    .valueChanges
                    .pipe(
                        debounceTime(300),
                        distinctUntilChanged()
                    )
                    .subscribe(_ => this.search()),
                this.buildingFF
                    .valueChanges
                    .pipe(
                        debounceTime(300),
                        distinctUntilChanged()
                    )
                    .subscribe(_ => this.search()),
                this.floorFF
                    .valueChanges
                    .pipe(
                        debounceTime(300),
                        distinctUntilChanged()
                    )
                    .subscribe(_ => this.search())
            );
    }

    private search() {
        this.officeSrv
            .search(this.locationFF.value, this.buildingFF.value, this.floorFF.value)
            .subscribe(res => this.list = res);
    }

    select(office: Office) {
        this.selectedOffice = office;
    }
}
