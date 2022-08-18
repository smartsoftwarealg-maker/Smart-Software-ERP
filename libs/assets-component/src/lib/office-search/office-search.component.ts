import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Lookup, Office, OfficeService} from '@ss/common/api-lookup';
import {AssetLocationService} from '../asset-location.service';
import {AssetsBuildingService} from '../assets-building.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {FormControl} from '@angular/forms';
import {Subscription, switchMap} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';

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
    buildings: Lookup[] = [];
    floors:    Lookup[] = [];

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
                    .subscribe(_ => this.findBuildings()),
                this.buildingFF
                    .valueChanges
                    .pipe(
                        debounceTime(300),
                        distinctUntilChanged()
                    )
                    .subscribe(_ => this.findFloors()),
                this.floorFF
                    .valueChanges
                    .pipe(
                        debounceTime(300),
                        distinctUntilChanged()
                    )
                    .subscribe(_ => this.findOffices())
            );
    }

    private findBuildings() {
        this.officeSrv
            .buildings(this.locationFF.value || 0)
            .subscribe(res => {
                this.buildings = res;
                this.buildingFF.setValue(null);
            });
    }

    private findFloors() {
        this.officeSrv
            .floors(this.locationFF.value || 0, this.buildingFF.value || 0)
            .subscribe(res => this.floors = res);
    }

    private findOffices() {
        this.officeSrv
            .search(this.locationFF.value || 0, this.buildingFF.value || 0, this.floorFF.value || 0)
            .subscribe(res => this.list = res);
    }

    select(office: Office) {
        this.selectedOffice = office;
    }
}
