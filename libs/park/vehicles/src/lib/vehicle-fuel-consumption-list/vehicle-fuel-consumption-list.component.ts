import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { FuelConsumption } from '../vehicle-api';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { VehicleFuelConsumptionService } from '../services/vehicle-fuel-consumption.service';
import { MaterialModule } from "@ss/common/api-common";

@Component({
    selector: 'ss-vehicle-fuel-consumption-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MatTableModule, UiPaginationModule, MaterialModule],
    templateUrl: './vehicle-fuel-consumption-list.component.html',
    styleUrls: ['./vehicle-fuel-consumption-list.component.css']
})
export class VehicleFuelConsumptionListComponent extends BaseChildEntityListComponent<FuelConsumption> {
    override displayedColumns = ['date', 'driverName', 'fuelDescription', 'orderNo', 'odoMeter'];

    constructor(protected override detailSrv: VehicleFuelConsumptionService) {
        super(detailSrv);
    }
}
