import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { DriverLicense } from '../driver-api';
import { DriverLicenseService } from '../services/driver-license.service';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MaterialModule } from "@ss/common/api-common";

@Component({
    selector: 'ss-driver-license-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MatTableModule, UiPaginationModule, MaterialModule],
    templateUrl: './driver-license-list.component.html',
    styleUrls: ['./driver-license-list.component.css']
})
export class DriverLicenseListComponent extends BaseChildEntityListComponent<DriverLicense> {
    override displayedColumns = ['licenseType', 'from', 'to'];

    constructor(protected override detailSrv: DriverLicenseService) {
        super(detailSrv);
    }
}
