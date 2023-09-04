import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { VehicleMissionService } from '../services/vehicle-mission.service';
import { VehicleMission } from '../vehicle-api';

@Component({
    selector: 'ss-mission-vehicles-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MatTableModule, UiPaginationModule],
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
        'destination'
    ];

    constructor(protected override detailSrv: VehicleMissionService) {
        super(detailSrv);
    }
}

