import { Component, inject, Inject, OnDestroy, OnInit, signal} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lookup, Office, OfficeService } from '@ss/common/api-lookup';
import { AssetLocationService, AssetsBuildingService } from '@ss/assets-component';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MaterialModule } from '@ss/common/api-common';




import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { RouterModule } from '@angular/router';



import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-office-search',
    templateUrl: './office-search.component.html',
    styleUrls: ['./office-search.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    RouterModule,
    UiAutoCompleteComponent
]

})
export class OfficeSearchComponent implements OnDestroy, OnInit {
    private buildingSrv = inject(AssetsBuildingService);
    private officeSrv = inject(OfficeService);
    private locationSrv = inject(AssetLocationService);

    isCMMS = false;

    subscriptions: Subscription[] = [];
    selectedOffice = signal<Office | null>(null);
    locationLookup = new DefaultAutoCompleteModel(this.locationSrv);
    buildingLookup = new DefaultAutoCompleteModel(this.buildingSrv);
    buildings: Lookup[] = [];
    floors = signal<Lookup[]>([]);

    locationFF = new FormControl<number>(0);
    buildingFF = new FormControl<number>(0);
    floorFF = new FormControl<number>(0);
    list = signal<Office[]>([]);

    constructor(public dialogRef: MatDialogRef<OfficeSearchComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Office) {
        this.isCMMS = data?.cmms||false;
        this.locationLookup.onObjectSelected = o => this.buildingSrv.setParentId(o?.id||0);
        this.buildingSrv.setParentId(0);
    }

    close() {
        this.dialogRef.close(null);
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
                this.floors.set(res);
                this.floorFF.setValue(null);
            });
    }

    private findOffices() {
        this.officeSrv
            .search(this.locationFF.value || 0, this.buildingFF.value || 0, this.floorFF.value || 0)
            .subscribe(res => this.list.set(res));
    }

    onSelect(office: Office) {
        this.selectedOffice.set(office);
    }
}
