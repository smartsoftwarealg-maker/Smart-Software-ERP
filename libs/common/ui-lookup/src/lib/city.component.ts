import { Component, inject } from '@angular/core';
import {City, CityService, WilayaService} from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import { DairaService } from '../../../api-lookup/src/lib/dira.service';


@Component({
    selector: 'ss-city-list',
    templateUrl: './base-templates/city-list.component.html',
    styleUrls: ['./base-templates/classes.scss']
})
export class CityListComponent extends BaseEntityListComponent<City> {

    displayedColumns = ['description', 'descriptionAr', 'dairaDescription', 'wilayaDescription'];

    constructor(
        public citySrv: CityService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(citySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'COMMON_CITIES');
        this.pagination.pageSize = 15;
    }
}


@Component({
    selector: 'ss-city-detail',
    templateUrl: './base-templates/city-detail.component.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class CityDetailComponent extends BaseEntityDetailComponent<City> {
    private wilayaSrv  = inject(WilayaService);
    private dairaSrv  = inject(DairaService);
    wilayLookupModel = new DefaultAutoCompleteModel(this.wilayaSrv);
    dairaLookupModel = new DefaultAutoCompleteModel(this.dairaSrv);

    constructor(
        public citySrv: CityService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(citySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_CITY');
    }

    public override setupForm(e: City): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
            daira: [e.daira],
            wilaya: [e.wilaya]
        });
    }
}
