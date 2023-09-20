import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { VehicleDriverService } from '../services/vehicle-driver.service';
import { VehicleDriver } from '../vehicle-api';
import { MaterialModule } from "@ss/common/api-common";

@Component({
    selector: 'ss-driver-vehicles-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MatTableModule, UiPaginationModule, MaterialModule],
    templateUrl: './vehicles-driver-list.component.html',
    styleUrls: ['./vehicles-driver-list.component.css']
})
export class VehicleDriverListComponent extends BaseChildEntityListComponent<VehicleDriver> {
    override displayedColumns = ['date', 'fullName'];

    constructor(protected override detailSrv: VehicleDriverService) {
        super(detailSrv);
    }
}

