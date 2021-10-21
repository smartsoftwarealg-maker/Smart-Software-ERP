import { Component } from '@angular/core';
import {City, CityService, WilayaService} from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {Observable, of, map} from 'rxjs';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';


@Component({
    selector: 'ss-city-list',
    templateUrl: './base-templates/city-list.component.html',
    styleUrls: ['./base-templates/classes.scss']
})
export class CityListComponent extends BaseEntityListComponent<City> {

    displayedColumns = ['description', 'descriptionAr', 'wilaya'];

    constructor(
        public citySrv: CityService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        private wilayaSrv: WilayaService) {
        super(citySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'COMMON_CITIES');
    }

    processLoadedData(data: City[]): Observable<City[]> {
        return this.wilayaSrv
            .getByIDs(data.map(c => c.wilaya || 0))
            .pipe(map(wilayas => {
                data.forEach(c => c.wilayaDescr = wilayas.find(w => w.id === c.wilaya)?.description);
                return data;
            }));
    }

}


@Component({
    selector: 'ss-city-detail',
    templateUrl: './base-templates/city-detail.component.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class CityDetailComponent extends BaseEntityDetailComponent<City> {
    wilayLookupModel = new DefaultAutoCompleteModel(this.wilayaSrv);

    constructor(
        public citySrv: CityService,
        public wilayaSrv: WilayaService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(citySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_CITY');
    }

    public setupForm(e: City): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
            wilaya: [e.wilaya]
        });
    }
}
