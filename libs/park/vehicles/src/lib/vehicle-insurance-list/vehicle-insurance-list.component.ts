import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { VehicleInsurance } from '../vehicle-api';
import { VehicleInsuranceService } from '../services/vehicle-insurance.service';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-vehicle-insurance-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MatTableModule, UiPaginationModule],
    templateUrl: './vehicle-insurance-list.component.html',
    styleUrls: ['./vehicle-insurance-list.component.css']
})
export class VehicleInsuranceListComponent extends BaseChildEntityListComponent<VehicleInsurance> {
    override displayedColumns = ['date', 'policyDescription', 'agencyDescription', 'amount'];

    constructor(protected override detailSrv: VehicleInsuranceService) {
        super(detailSrv);
    }
}
