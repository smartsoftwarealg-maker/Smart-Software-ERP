import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { VehicleDamage } from '../vehicle-api';
import { VehicleDamageService } from '../services/vehicle-damage.service';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MaterialModule } from "@ss/common/api-common";

@Component({
    selector: 'ss-vehicle-damage-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MatTableModule, UiPaginationModule, MaterialModule],
    templateUrl: './vehicle-damage-list.component.html',
    styleUrls: ['./vehicle-damage-list.component.css']
})
export class VehicleDamageListComponent extends BaseChildEntityListComponent<VehicleDamage> {
    override displayedColumns = ['date', 'fullName', 'description'];

    constructor(protected override detailSrv: VehicleDamageService) {
        super(detailSrv, 'VehicleDamage');
    }
}
