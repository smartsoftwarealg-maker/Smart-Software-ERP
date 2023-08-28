import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Employee, EmployeeService } from '@ss/employee-services/employee-services';
import {
    EmployeeLanguagesService,
} from '@ss/payroll/api-employee';
import {
    BloodGroupService, City,
    CityService,
    LookupsService,
    MaritalStatus,
    NationalityService
} from '@ss/common/api-lookup';
import { AppArchiveService, EMPLOYEE_ARCHIVES } from '@ss/common/app-archive';
import { CommonUiImageInputModule, ImageModel } from '@ss/common/ui-image-input';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import {
    AbstractControl,
    ReactiveFormsModule,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import { FixedElementsEntryService } from '@ss/remuneration/elements-entry';
import { Observable, switchMap } from 'rxjs';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'ss-cmms-employee-detail',
    standalone: true,
    imports: [CommonModule, CommonUiAutoCompleteModule, CommonUiDatepickerModule, CommonUiImageInputModule, CommonUiLangModule, MatButtonModule, MatCheckboxModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatRadioModule, MatSelectModule, MaterialModule, ReactiveFormsModule, RouterOutlet],
    templateUrl: './cmms-employee-detail.component.html',
    styleUrls: ['./cmms-employee-detail.component.scss'],
})
export class CmmsEmployeeDetailComponent extends BaseEntityDetailComponent<Employee> {
    private languageSrv = inject(EmployeeLanguagesService);
    private bloodGroupSrv = inject(BloodGroupService);
    private citySrv = inject(CityService);
    private nationalitySrv = inject(NationalityService);
    private archiveSrv = inject(AppArchiveService);
    private PANELS = [
        ''
    ];


    activePanel:-1|0|1|2|3|4|5|6|7|8|9|10|11 = -1;

    readonly PAYROLL_IEP = 1;
    readonly PAYROLL_OLD_ELEMENTS = 2;
    readonly PAYROLL_RANK = 3;
    readonly PAYROLL_POST = 4;

    hrMode = false;
    activePersonnel = true;
    imageModel: ImageModel;
    cityLookup = new CityLookup(this.citySrv);

    nationalityModel = new DefaultAutoCompleteModel(this.nationalitySrv);
    public maritalStatuses: MaritalStatus[];
    public elementsForm: UntypedFormGroup = null;
    bloodGroups$ = this.bloodGroupSrv.getList(0, 50).pipe(map(res => res.body));

    constructor(
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public employeeSrv: EmployeeService,
        public httpSrv: HttpService,
        public infoSrv: FixedElementsEntryService,
        private lookupsSrv: LookupsService,
        private router: Router) {
        super(employeeSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_EDIT_EMPLOYEE');
        this.imageModel = new ImageModel(this.httpSrv);
    }


    public override preload(): Observable<any> {
        this.route.data.subscribe(data => {
            this.hrMode = !!data['hrMode'];
            this.activePersonnel = !!data['active'];
        });
        return this.lookupsSrv
            .getMaritalStatuses()
            .pipe(
                tap((x: MaritalStatus[]) => this.maritalStatuses = x),
            );
    }

    public override setupForm(p: Employee) {
        this.archiveSrv.appId = EMPLOYEE_ARCHIVES;
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

        this.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(this.id), false);
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
            is_driver:     [p.is_driver || false, Validators.required],
            cmmsPerson:    [p.cmmsPerson || true, Validators.required],
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


    override uploadAttachments(id: number): Observable<any> {
        this.imageModel.setBackendUrl(this.employeeSrv.getPhotoUrl(id));
        return this.imageModel.submit('file');
    }

    get elementsFormArray(): UntypedFormArray {
        return this.elementsForm?.controls['elements'] as UntypedFormArray;
    }



    showPanel(panel: 0|1|2|3|4|5|6|7|8|9|10|11) {
        this.activePanel = panel;
        const dest = this.PANELS[panel];
        if (this.router.url.indexOf(dest) <0) {
            this.router.navigate([dest], { relativeTo: this.route }).then();
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
