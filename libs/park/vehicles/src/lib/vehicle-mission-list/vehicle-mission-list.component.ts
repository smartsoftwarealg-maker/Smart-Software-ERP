import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { VehicleMissionService } from '../services/vehicle-mission.service';
import { VehicleMission } from '../vehicle-api';
import { MaterialModule } from "@ss/common/api-common";
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-mission-vehicles-list',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatTableModule, MaterialModule, PaginationComponent, TranslatePipe],
    templateUrl: './vehicle-mission-list.component.html',
    styleUrls: ['./vehicle-mission-list.component.css']
})
export class VehicleMissionListComponent extends BaseChildEntityListComponent<VehicleMission> {
    override displayedColumns = [
        'number',
        'firstName',
        'lastName',
        'missionTime',
        'returnTime',
        'destinationDescription'
    ];

    constructor(protected override detailSrv: VehicleMissionService) {
        super(detailSrv, 'VehicleMission');
    }
}

