import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { DriverVehicle } from '../driver-api';
import { DriverVehicleService } from '../services/driver-vehicle.service';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MaterialModule } from "@ss/common/api-common";

@Component({
    selector: 'ss-driver-vehicles-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MatTableModule, UiPaginationModule, MaterialModule],
    templateUrl: './driver-vehicles-list.component.html',
    styleUrls: ['./driver-vehicles-list.component.css']
})
export class DriverVehiclesListComponent extends BaseChildEntityListComponent<DriverVehicle> {
    override displayedColumns = ['date', 'plateNo', 'description'];

    constructor(protected override detailSrv: DriverVehicleService) {
        super(detailSrv, 'DriverVehicle');
    }
}

