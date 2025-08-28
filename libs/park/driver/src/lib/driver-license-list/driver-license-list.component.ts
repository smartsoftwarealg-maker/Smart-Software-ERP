import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { DriverLicense } from '../driver-api';
import { DriverLicenseService } from '../services/driver-license.service';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { MaterialModule } from '@ss/common/api-common';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-driver-license-list',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatTableModule,
        MaterialModule,
        PaginationComponent,
        TranslatePipe,
        TranslateDirective,
    ],
    templateUrl: './driver-license-list.component.html',
    styleUrls: ['./driver-license-list.component.css'],
})
export class DriverLicenseListComponent extends BaseChildEntityListComponent<DriverLicense> {
    override displayedColumns = ['licenseType', 'from', 'to'];

    constructor(protected override detailSrv: DriverLicenseService) {
        super(detailSrv, 'DriverLicense');
    }
}
