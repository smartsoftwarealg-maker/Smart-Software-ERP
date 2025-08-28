import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { VehicleDamage } from '../vehicle-api';
import { VehicleDamageService } from '../services/vehicle-damage.service';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-vehicle-damage-list',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatTableModule,
        MaterialModule,
        TranslatePipe,
        PaginationComponent,
        TranslateDirective,
    ],
    templateUrl: './vehicle-damage-list.component.html',
    styleUrls: ['./vehicle-damage-list.component.css'],
})
export class VehicleDamageListComponent extends BaseChildEntityListComponent<VehicleDamage> {
    override displayedColumns = ['date', 'fullName', 'description'];

    constructor(protected override detailSrv: VehicleDamageService) {
        super(detailSrv, 'VehicleDamage');
    }
}
