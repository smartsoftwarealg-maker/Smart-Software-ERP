import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import { Lookup, Wilaya } from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { VehicleTypeService } from '@ss/common/api-lookup';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';


@Component({
    selector: 'ss-vehicle-type-list',
    templateUrl: '../base-templates/list-template.html',
    styleUrls: ['../base-templates/list-template.scss'],
    standalone: true,
    imports: [MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent
    ]
})
export class VehicleTypeListComponent extends BaseEntityListComponent<Lookup> {

    displayedColumns = ['description'];

    constructor(
        public wilayaSrv: VehicleTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(wilayaSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'PARK_VEHICLE_TYPES');
    }
}



@Component({
    selector: 'ss-vehicle-type-detail',
    templateUrl: '../base-templates/detail-template.html',
    styleUrls: ['../base-templates/detail-template.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput]
})
export class VehicleTypeDetailComponent extends BaseEntityDetailComponent<Lookup> {

    constructor(
        public wilayaSrv: VehicleTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(wilayaSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PARK_VEHICLE_TYPES');
    }

    public override setupForm(e: Wilaya): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }
}
