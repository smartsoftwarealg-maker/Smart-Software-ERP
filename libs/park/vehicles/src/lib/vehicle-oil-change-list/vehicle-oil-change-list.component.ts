import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { VehicleOilChangeService } from '../services/vehicle-oil-change.service';
import { OilChange } from '../vehicle-api';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { MaterialModule } from '@ss/common/api-common';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-vehicle-oil-change-list',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatTableModule, MaterialModule, PaginationComponent, TranslatePipe],
    templateUrl: './vehicle-oil-change-list.component.html',
    styleUrls: ['./vehicle-oil-change-list.component.css']
})
export class VehicleOilChangeListComponent extends BaseChildEntityListComponent<OilChange> {
    override displayedColumns = ['date', 'odometer', 'nextDate', 'nextOdometer'];

    constructor(protected override detailSrv: VehicleOilChangeService) {
        super(detailSrv, 'OilChange');
    }
}
