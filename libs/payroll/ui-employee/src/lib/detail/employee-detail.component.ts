import {Component} from '@angular/core';
import {Employee, EmployeeService} from '@ss/payroll/api-employee';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ImageModel} from '@ss/common/ui-image-input';
import {LookupsService, MaritalStatus, Nationality, NationalityService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {MatExpansionPanel} from '@angular/material/expansion';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {count, Observable, of, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {HttpService} from '@ss/common/api-common';
import {ELine, FixedElementsEntryService} from '@ss/remuneration/elements-entry';

@Component({
    selector: 'ss-employee-detail',
    styleUrls: ['./employee-detail.component.scss'],
    templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent extends BaseEntityDetailComponent<Employee> {
    readonly PAYROLL_IEP = 1;
    readonly PAYROLL_OLD_ELEMENTS = 2;
    readonly PAYROLL_RANK = 3;
    readonly PAYROLL_POST = 4;

    imageModel: ImageModel;
    nationalityModel: DefaultAutoCompleteModel<Nationality>;
    maritalStatuses: MaritalStatus[];
    public elementsForm: FormGroup = null;
    generationModes = [ {id: 1, description: 'PAYROLL_IEP'},
                        {id: 2, description: 'PAYROLL_OLD_ELEMENTS'},
                        {id: 3, description: 'PAYROLL_RANK'},
                        {id: 4, description: 'PAYROLL_POST'},
                     ];
    constructor(
        public employeeSrv: EmployeeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public infoSrv: FixedElementsEntryService) {
        super(employeeSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_EDIT_EMPLOYEE');
        this.imageModel = new ImageModel(this.httpSrv);
        this.nationalityModel = new DefaultAutoCompleteModel<Nationality>(new NationalityService(httpSrv));
    }

    public preload(): Observable<any> {
        return this.lookupsSrv.getMaritalStatuses()
            .pipe(
                tap(x => this.maritalStatuses = x),
            );
    }

    public setupForm(p: Employee) {
        this.infoSrv.load()
            .pipe(switchMap(_ => this.infoSrv.get(p.id)))
            .subscribe(res => {
                const elements = res.elements.length === 0?
                    this.infoSrv.loadDataCols().map(_ => 0.0) :
                    res.elements;

                this.elementsForm = this.formBuilder.group({
                    elements: this.formBuilder.array(elements)
                });
            });

        this.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(this.id), false);
        // Make sure to update the template if you edit the configuration here
        if (!p.id) {
            p.sex = 1;
        }

        return this.formBuilder.group({
            // birth info
            id: p.id,
            firstName: [p.firstName, Validators.compose([Validators.required, Validators.maxLength(64)])],
            lastName: [p.lastName, Validators.compose([Validators.required, Validators.maxLength(64)])],
            sex: [p.sex, Validators.required],
            birthDate: [p.birthDate, Validators.required],
            birthPlace: [p.birthPlace, Validators.compose([Validators.required, Validators.maxLength(64)])],
            father: [p.father, Validators.maxLength(64)],
            mother: [p.mother, Validators.maxLength(64)],
            nationality: [p.nationality, Validators.required],
            // social info
            address1: [p.address1, Validators.maxLength(128)],
            email: [p.email, Validators.maxLength(64)],
            phone: [p.phone, Validators.maxLength(32)],
            mobile: [p.mobile, Validators.maxLength(32)],
            ss_Number: [p.ss_Number, Validators.compose([Validators.required, Validators.maxLength(32)])],
            maritalStatus: p.maritalStatus,
            // arabic info
            firstNameAr: [p.firstNameAr, Validators.maxLength(64)],
            lastNameAr: [p.lastNameAr, Validators.maxLength(64)],
            birthPlaceAr: [p.birthPlaceAr, Validators.maxLength(64)],
            fatherAr: [p.fatherAr, Validators.maxLength(64)],
            motherAr: [p.motherAr, Validators.maxLength(64)]
        });
    }

    public isControlValid(c: AbstractControl): boolean {
        return !c.touched || c.valid;
    }

    public isBirthInfoValid(): boolean {
        return this.isControlValid(this.form.controls.firstName) &&
            this.isControlValid(this.form.controls.lastName) &&
            this.isControlValid(this.form.controls.sex) &&
            this.isControlValid(this.form.controls.birthDate) &&
            this.isControlValid(this.form.controls.birthPlace) &&
            this.isControlValid(this.form.controls.father) &&
            this.isControlValid(this.form.controls.mother) &&
            this.isControlValid(this.form.controls.nationality);
    }

    public isSocialInfoPanelValid(): boolean {
        return this.isControlValid(this.form.controls.address1) &&
            this.isControlValid(this.form.controls.email) &&
            this.isControlValid(this.form.controls.phone) &&
            this.isControlValid(this.form.controls.mobile) &&
            this.isControlValid(this.form.controls.ss_Number) &&
            this.isControlValid(this.form.controls.maritalStatus);
    }

    public isArabicInfoPanelValid(): boolean {
        return this.isControlValid(this.form.controls.firstNameAr) &&
            this.isControlValid(this.form.controls.lastNameAr) &&
            this.isControlValid(this.form.controls.birthPlaceAr) &&
            this.isControlValid(this.form.controls.fatherAr) &&
            this.isControlValid(this.form.controls.motherAr);
    }

    public isSectionValid(section: string): boolean {
        switch (section) {
            case 'birthinfo':
                return this.isBirthInfoValid();
            case 'socialInfo':
                return this.isSocialInfoPanelValid();
            case 'arabicInfo':
                return this.isArabicInfoPanelValid();
            default:
                throw new Error('Unknown section ' + section)
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

    public readForm(): Employee {
        return this.form.value;
    }

    uploadAttachments(id: number): Observable<any> {
        this.imageModel.setBackendUrl(this.employeeSrv.getPhotoUrl(id));
        return this.imageModel.submit('file');
    }

    get elementsFormArray(): FormArray {
        return this.elementsForm?.controls['elements'] as FormArray;
    }

    saveElements() {
        const line: ELine = { id: this.form.controls['id'].value,
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
            .confirm('PAYROLL_ELEMENT_GENERATION',  'PAYROLL_GENERATE_ELEMENTS', true, true)
            .pipe(switchMap(res =>
                res ? code === this.PAYROLL_IEP ?
                    this.infoSrv.generateFromIEP(id) :
                    code === this.PAYROLL_OLD_ELEMENTS ? this.infoSrv.generateFromOldElements(id) :
                        code === this.PAYROLL_RANK ? this.infoSrv.generateFromRank(id) :
                            code === this.PAYROLL_POST ? this.infoSrv.generateFromPost(id) : of({count: -1 }) : of({count: -1 })
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
}
