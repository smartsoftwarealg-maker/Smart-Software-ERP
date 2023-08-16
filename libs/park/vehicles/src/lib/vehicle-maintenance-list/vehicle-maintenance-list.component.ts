import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { VehicleMaintenance } from '../vehicle-api';
import { VehicleMaintenanceService } from '../services/vehicle-maintenance.service';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-vehicle-maintenance-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MatTableModule, UiPaginationModule],
    templateUrl: './vehicle-maintenance-list.component.html',
    styleUrls: ['./vehicle-maintenance-list.component.css']
})
export class VehicleMaintenanceListComponent extends BaseChildEntityListComponent<VehicleMaintenance> {
    override displayedColumns = ['date', 'description', 'supplierName', 'invoiceNo'];

    constructor(protected override detailSrv: VehicleMaintenanceService) {
        super(detailSrv);
    }

}
