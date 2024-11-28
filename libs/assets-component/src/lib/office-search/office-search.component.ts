import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lookup, Office, OfficeService } from '@ss/common/api-lookup';
import { AssetLocationService, AssetsBuildingService } from '@ss/assets-component';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';




import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { RouterModule } from '@angular/router';
import { CustomAttributesModule } from '@ss/custom-attributes';

import { QRCodeModule } from 'angularx-qrcode';

@Component({
    selector: 'ss-office-search',
    templateUrl: './office-search.component.html',
    styleUrls: ['./office-search.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,




        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,

        QRCodeModule
    ]

})
export class OfficeSearchComponent implements OnDestroy, OnInit {
    private buildingSrv = inject(AssetsBuildingService);
    private officeSrv = inject(OfficeService);
    private locationSrv = inject(AssetLocationService);

    isCMMS = false;

    subscriptions: Subscription[] = [];
    selectedOffice: Office | null = null;
    locationLookup = new DefaultAutoCompleteModel(this.locationSrv);
    buildingLookup = new DefaultAutoCompleteModel(this.buildingSrv);
    buildings: Lookup[] = [];
    floors: Lookup[] = [];

    locationFF = new FormControl<number>(0);
    buildingFF = new FormControl<number>(0);
    floorFF = new FormControl<number>(0);
    list: Office[] = [];

    constructor(public dialogRef: MatDialogRef<OfficeSearchComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Office) {
        this.isCMMS = data?.cmms;
        this.locationLookup.onObjectSelected = o => this.buildingSrv.setParentId(o?.id);
        this.buildingSrv.setParentId(0);
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
                    .subscribe(_ => {
                        this.findFloors();
                        if (this.isCMMS) {
                            this.findOffices();
                        }
                    }),
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
                this.floorFF.setValue(null);
            });
    }

    private findFloors() {
        this.officeSrv
            .floors(this.locationFF.value || 0, this.buildingFF.value || 0)
            .subscribe(res => {
                this.floors = res;
                this.floorFF.setValue(null);
            });
    }

    private findOffices() {
        this.officeSrv
            .search(this.locationFF.value || 0, this.buildingFF.value || 0, this.floorFF.value || 0)
            .subscribe(res => this.list = res);
    }

    onSelect(office: Office) {
        this.selectedOffice = office;
    }
}
