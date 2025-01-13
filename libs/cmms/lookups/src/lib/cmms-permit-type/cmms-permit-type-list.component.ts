import { Component } from '@angular/core';
import { Lookup } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CMMSPermitTypeService } from '../services/cmms-permit-type.service';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { PaginationComponent } from '@ss/common/ui-pagination';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-cmms-permit-type-list',
    templateUrl: '../list-template/cmms-fault-list.component.html',
    styleUrls: ['../list-template/cmms-fault-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        PaginationComponent,
        MatSortModule,
        MatTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslatePipe
    ],
})
export class CmmsPermitTypeListComponent extends BaseEntityListComponent<Lookup> {
    displayedColumns = ['description', 'descriptionAr'];
    constructor(
        public override entitySrv: CMMSPermitTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'CMMS_PERMIT_TYPES');
    }
}
