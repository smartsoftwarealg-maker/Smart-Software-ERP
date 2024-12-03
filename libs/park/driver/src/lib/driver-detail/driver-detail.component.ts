import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    BloodGroupService,
    City,
    CityService,
    LookupsService,
    MaritalStatus
} from '@ss/common/api-lookup';
import { AppArchiveMainComponent, AppArchiveService, EMPLOYEE_ARCHIVES } from '@ss/common/app-archive';
import {  ImageModel } from '@ss/common/ui-image-input';
import {  DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import {
    AbstractControl,
    FormsModule, ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpService } from '@ss/common/api-common';
import { FixedElementsEntryService } from '@ss/remuneration/elements-entry';
import { Observable, switchMap } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Driver } from '../driver-api';
import { DriverService } from '../services/driver.service';
import { DriverLicenseMainComponent } from '../driver-license-main/driver-license-main.component';
import { DriverLicenseService } from '../services/driver-license.service';
import { DriverVehicleService } from '../services/driver-vehicle.service';

@Component({
    selector: 'ss-driver-detail',
    standalone: true,
    imports: [
        CommonModule,


        DatePickerComponent,


        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        ReactiveFormsModule,
        DriverLicenseMainComponent,
        AppArchiveMainComponent
    ],
    templateUrl: './driver-detail.component.html',
    styleUrls: ['./driver-detail.component.css']
})
export class DriverDetailComponent extends BaseEntityDetailComponent<Driver> {
    private bloodGroupSrv = inject(BloodGroupService);
    private driverVehiclesSrv = inject(DriverVehicleService);
    private driverLicenseSrv = inject(DriverLicenseService);
    private router = inject(Router);
    private lookupsSrv = inject(LookupsService);
    private citySrv = inject(CityService);
    private archiveSrv = inject(AppArchiveService);

    cityLookup = new CityLookup(this.citySrv);

    readonly PAYROLL_POST = 4;
    readonly ARCHIVE_PANEL = 1;
    readonly LICENSE_PANEL = 2;
    readonly VEHICLE_PANEL = 3;
    detailPanel = 0;

    activePersonnel = false;
    imageModel: ImageModel;
    public maritalStatuses: MaritalStatus[];
    public elementsForm: UntypedFormGroup = null;
    bloodGroups$ = this.bloodGroupSrv.getList(0, 50).pipe(map(res => res.body));

    constructor(
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public driverSrv: DriverService,
        public httpSrv: HttpService,
        public infoSrv: FixedElementsEntryService) {
        super(driverSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_EDIT_EMPLOYEE');
        this.imageModel = new ImageModel(this.httpSrv);
        this.driverLicenseSrv.setParentId(0);
        this.driverVehiclesSrv.setParentId(0);
        this.archiveSrv.appId = EMPLOYEE_ARCHIVES;
    }

    public override preload(): Observable<any> {
        return this.lookupsSrv
            .getMaritalStatuses()
            .pipe(
                tap((x: MaritalStatus[]) => this.maritalStatuses = x),
            );
    }

    override loadEntity(id: number): Observable<Driver> {
        this.driverLicenseSrv.setParentId(id);
        this.driverVehiclesSrv.setParentId(id);
        return super.loadEntity(id);
    }

    public override setupForm(p: Driver) {
        this.infoSrv.load()
            .pipe(switchMap(() => this.infoSrv.get(p.id)))
            .subscribe(res => {
                const elements = res.elements.length === 0 ?
                    this.infoSrv.loadDataCols().map(() => 0.0) :
                    res.elements;

                this.elementsForm = this.formBuilder.group({
                    elements: this.formBuilder.array(elements)
                });
            });

        this.imageModel.setImageUrl(this.driverSrv.getPhotoUrl(this.id), false);
        if (!p.id) {
            p.sex = 1;
        }

        return this.formBuilder.group({
            // birth info
            id:            [p.id],
            firstName:     [p.firstName, Validators.compose([Validators.required, Validators.maxLength(64)])],
            lastName:      [p.lastName, Validators.compose([Validators.required, Validators.maxLength(64)])],
            sex:           [p.sex, Validators.required],
            birthDate:     [p.birthDate, Validators.required],
            birthPlace:    [p.birthPlace, Validators.compose([Validators.required, Validators.maxLength(64)])],
            father:        [p.father, Validators.maxLength(64)],
            mother:        [p.mother, Validators.maxLength(64)],
            nationality:   [p.nationality],
            // social inf  o
            address1:      [p.address1, Validators.maxLength(128)],
            email:         [p.email, Validators.maxLength(64)],
            phone:         [p.phone, Validators.maxLength(32)],
            mobile:        [p.mobile, Validators.maxLength(32)],
            ss_Number:     [p.ss_Number],
            maritalStatus: [p.maritalStatus],
            // arabic info
            firstNameAr:   [p.firstNameAr, Validators.maxLength(64)],
            lastNameAr:    [p.lastNameAr, Validators.maxLength(64)],
            birthPlaceAr:  [p.birthPlaceAr, Validators.maxLength(64)],
            fatherAr:      [p.fatherAr, Validators.maxLength(64)],
            motherAr:      [p.motherAr, Validators.maxLength(64)],
            birthCity:     [p.birthCity],
            is_driver:     [true],
            blood_group:   [p.blood_group]
        });
    }

    public isControlValid(c: AbstractControl): boolean {
        return !c.touched || c.valid;
    }

    public isBirthInfoValid(): boolean {
        return this.isControlValid(this.form.controls['firstName']) &&
            this.isControlValid(this.form.controls['lastName']) &&
            this.isControlValid(this.form.controls['sex']) &&
            this.isControlValid(this.form.controls['birthDate']) &&
            this.isControlValid(this.form.controls['birthPlace']) &&
            this.isControlValid(this.form.controls['father']) &&
            this.isControlValid(this.form.controls['mother']) &&
            this.isControlValid(this.form.controls['nationality']);
    }

    public issocialInfoPanelValid(): boolean {
        return this.isControlValid(this.form.controls['address1']) &&
            this.isControlValid(this.form.controls['email']) &&
            this.isControlValid(this.form.controls['phone']) &&
            this.isControlValid(this.form.controls['mobile']) &&
            this.isControlValid(this.form.controls['ss_Number']) &&
            this.isControlValid(this.form.controls['maritalStatus']);
    }

    public isArabicInfoPanelValid(): boolean {
        return this.isControlValid(this.form.controls['firstNameAr']) &&
            this.isControlValid(this.form.controls['lastNameAr']) &&
            this.isControlValid(this.form.controls['birthPlaceAr']) &&
            this.isControlValid(this.form.controls['fatherAr']) &&
            this.isControlValid(this.form.controls['motherAr']);
    }

    public isFixedElementsPanelValid(): boolean {
        // todo: implement
        return true;
    }

    public isSectionValid(section: string): boolean {
        switch (section) {
        case 'birthinfo':
            return this.isBirthInfoValid();
        case 'socialInfo':
            return this.issocialInfoPanelValid();
        case 'arabicInfo':
            return this.isArabicInfoPanelValid();
        case 'fixedElemnts':
            return this.isFixedElementsPanelValid();
        default:
            return true;
        }
    }

    public getPanelHeaderClass(section: string, panel: MatExpansionPanel): string {
        // if invalid return warning class
        if (!this.isSectionValid(section)) {
            return 'b-warn-expansion-panel';
        }

        // if expanded return primary background class
        if (panel.expanded)
            return 'b-primary-expansion-panel';
        else
            return '';
    }

    public override readForm(): Driver {
        return this.form.value;
    }

    override uploadAttachments(id: number): Observable<any> {
        this.imageModel.setBackendUrl(this.driverSrv.getPhotoUrl(id));
        return this.imageModel.submit('file');
    }


    showArchive() {
        this.detailPanel = this.ARCHIVE_PANEL;
        const ARCHIVE = 'archive';
        if (this.router.url.indexOf(ARCHIVE) <0) {
            this.router.navigate([ARCHIVE], { relativeTo: this.route }).then();
        }
    }

    showLicense() {
        this.detailPanel = this.LICENSE_PANEL;
        const LICENSES = 'licenses';
        if (this.router.url.indexOf(LICENSES) <0) {
            this.router.navigate([LICENSES], { relativeTo: this.route }).then();
        }
    }

    showVehicles() {
        this.detailPanel = this.VEHICLE_PANEL;
        const VEHICLES = 'vehicles';
        if (this.router.url.indexOf(VEHICLES) <0) {
            this.router.navigate([VEHICLES], { relativeTo: this.route }).then();
        }
    }
}

class CityLookup extends DefaultAutoCompleteModel<City> {
    constructor(citySrv: CityService) {
        super(citySrv);
    }

    override toString = (x: any) => x ? x[this.descriptionField]?.substring(0, 50) +
        (x.dairaDescription? '/' + x.dairaDescription: '') +
        (x.wilayaDescription? '/' + x.wilayaDescription: ''): null;
}
