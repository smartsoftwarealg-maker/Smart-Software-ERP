import { Component, inject } from '@angular/core';
import { EmployeeService } from '@ss/employee-services/employee-services';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ImageModel } from '@ss/common/ui-image-input';
import {City, CityService, LookupsService, MaritalStatus, NationalityService} from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {MatExpansionPanel} from '@angular/material/expansion';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { Observable, of, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { ELine, FixedElementsEntryService } from '@ss/remuneration/elements-entry';
import { Employee } from '@ss/employee-services/employee-services';

@Component({
    selector: 'ss-employee-detail',
    styleUrls: ['./employee-detail.component.scss'],
    templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent extends BaseEntityDetailComponent<Employee> {
    private citySrv = inject(CityService);
    private nationalitySrv = inject(NationalityService);
    readonly PAYROLL_IEP = 1;
    readonly PAYROLL_OLD_ELEMENTS = 2;
    readonly PAYROLL_RANK = 3;
    readonly PAYROLL_POST = 4;

    hrMode = false;
    activePersonnel = false;
    imageModel: ImageModel;
    nationalityModel = new DefaultAutoCompleteModel(this.nationalitySrv);
    cityLookup = new CityLookup(this.citySrv);
    public maritalStatuses: MaritalStatus[];
    public elementsForm: UntypedFormGroup = null;
    generationModes = [
        { id: 1, description: 'PAYROLL_IEP' },
        { id: 2, description: 'PAYROLL_OLD_ELEMENTS' },
        { id: 3, description: 'PAYROLL_RANK' },
        { id: 4, description: 'PAYROLL_POST' },
    ];
    constructor(
        public employeeSrv: EmployeeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService,
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
        this.infoSrv.load()
            .pipe(switchMap(_ => this.infoSrv.get(p.id)))
            .subscribe(res => {
                const elements = res.elements.length === 0 ?
                    this.infoSrv.loadDataCols().map(_ => 0.0) :
                    res.elements;

                this.elementsForm = this.formBuilder.group({
                    elements: this.formBuilder.array(elements)
                });
            });

        this.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(this.id), false);
        if (!p.id) {
            p.sex = 1;
        }

        const form = this.formBuilder.group({
            // birth info
            id: p.id,
            firstName: [p.firstName, Validators.compose([Validators.required, Validators.maxLength(64)])],
            lastName: [p.lastName, Validators.compose([Validators.required, Validators.maxLength(64)])],
            sex: [p.sex, Validators.required],
            birthDate: [p.birthDate, Validators.required],
            birthPlace: [p.birthPlace, Validators.compose([Validators.required, Validators.maxLength(64)])],
            father: [p.father, Validators.maxLength(64)],
            mother: [p.mother, Validators.maxLength(64)],
            nationality: [p.nationality],
            // social info
            address1: [p.address1, Validators.maxLength(128)],
            email: [p.email, Validators.maxLength(64)],
            phone: [p.phone, Validators.maxLength(32)],
            mobile: [p.mobile, Validators.maxLength(32)],
            ss_Number: [p.ss_Number],
            maritalStatus: p.maritalStatus,
            // arabic info
            firstNameAr: [p.firstNameAr, Validators.maxLength(64)],
            lastNameAr: [p.lastNameAr, Validators.maxLength(64)],
            birthPlaceAr: [p.birthPlaceAr, Validators.maxLength(64)],
            fatherAr: [p.fatherAr, Validators.maxLength(64)],
            motherAr: [p.motherAr, Validators.maxLength(64)],
            birthCity:[p.birthCity]
        });
        // if (!this.isEditable) {
        //     form.disable();
        // }
        return form;
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

    public isSocialInfoPanelValid(): boolean {
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
            return this.isSocialInfoPanelValid();
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

    public override readForm(): Employee {
        const e: Employee = this.form.value;
        return e;
    }

    override uploadAttachments(id: number): Observable<any> {
        this.imageModel.setBackendUrl(this.employeeSrv.getPhotoUrl(id));
        return this.imageModel.submit('file');
    }

    get elementsFormArray(): UntypedFormArray {
        return this.elementsForm?.controls['elements'] as UntypedFormArray;
    }

    saveElements() {
        const line: ELine = {
            //            id: this.form.controls['id'].value, <--- why??
            id: this.id,
            firstName: '',
            lastName: '',
            elements: this.elementsFormArray.value,
            cols: this.infoSrv.colsString()
        };

        this.infoSrv
            .save(line)
            .subscribe({
                next: res => this.snackBarSrv.showSuccessMessage(),
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                }
            });
    }

    generateFrom(code: number) {
        const id = this.form.controls['id'].value;
        this.confirmationSrv
            .confirm('PAYROLL_ELEMENT_GENERATION', 'PAYROLL_GENERATE_ELEMENTS', true, true)
            .pipe(switchMap(res =>
                res ? code === this.PAYROLL_IEP ?
                    this.infoSrv.generateFromIEP(id) :
                    code === this.PAYROLL_OLD_ELEMENTS ? this.infoSrv.generateFromOldElements(id) :
                        code === this.PAYROLL_RANK ? this.infoSrv.generateFromRank(id) :
                            code === this.PAYROLL_POST ? this.infoSrv.generateFromPost(id) : of({ count: -1 }) : of({ count: -1 })
            )).subscribe({
                next: res => {
                    if (res.count >= 0) {
                        this.snackBarSrv.showSuccessMessage();
                    } else {
                        this.snackBarSrv.showMessage('PAYROLL_NO_CHANGES');
                    }
                },
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                }
            });
    }

    showArchive() {
        if (this.router.url.indexOf('archive') <0) {
            this.router.navigate(['archive'], { relativeTo: this.route });
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
