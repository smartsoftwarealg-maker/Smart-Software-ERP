import { Component, inject, signal } from '@angular/core';
import {EmployeeService} from '@ss/employee-services/employee-services';
import {
    AbstractControl,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule,
    ValidatorFn
} from '@angular/forms';
import { ActivatedRoute, Router, RouterEvent, RouterOutlet } from '@angular/router';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ImageModel} from '@ss/common/ui-image-input';
import {
    BloodGroupService,
    City,
    CityService,
    LookupsService,
    MaritalStatus,
    NationalityService
} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {MatExpansionPanel} from '@angular/material/expansion';
import { DefaultAutoCompleteModel, UserLookup } from "@ss/common/ui-auto-complete";
import { filter, Observable, of, switchMap } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import { HttpService, MaterialModule, UserService } from '@ss/common/api-common';
import {ELine, FixedElementsEntryService} from '@ss/remuneration/elements-entry';
import {Employee} from '@ss/employee-services/employee-services';
import {AppArchiveService, EMPLOYEE_ARCHIVES} from '@ss/common/app-archive';
import {
    ACTIVATION_ROUTE_URL,
    ARCHIVE_ROUTE_URL,
    CAREER_ROUTE_URL,
    CHILDREN_ROUTE_URL,
    CONTRACTS_ROUTE_URL,
    DECISION_ROUTE_URL,
    DIPLOMA_ROUTE_URL,
    EmployeeActivationService,
    EmployeeCareerService,
    EmployeeChildrenService,
    EmployeeContractService,
    EmployeeDecisionService,
    EmployeeInvitationService,
    EmployeeLanguagesService,
    EmployeeOldCareerService,
    EmployeeQuestioningService,
    EmployeeReclassificationService,
    EmployeeReintegrationService,
    EmployeeSuspensionService, EmployeeUnpaidLeavesService,
    EmployeeWivesService,
    FIXED_ELEMENTS_URL,
    INVITATION_ROUTE_URL,
    LANGUAGES_ROUTE_URL,
    OLD_CAREER_ROUTE_URL,
    PUNISHMENT_ROUTE_URL,
    QUESTIONING_ROUTE_URL,
    RECLASSIFICATION_ROUTE_URL,
    REINTEGRATION_ROUTE_URL,
    SUSPENSION_ROUTE_URL,
    TRAINING_ROUTE_URL, UNPAID_LEAVE_ROUTE_URL,
    WIVES_ROUTE_URL
} from '@ss/payroll/api-employee';
import {EmployeeDiplomaService} from '../employee-diplomas/employee-diploma.service';
import {EmployeeTrainingService} from '../employee-trainings/employee-training.service';
import {PunishmentService} from '../employee-punishments/punishment.service';
import { UserListService } from "@ss/common/api-users";
import { MatCard, MatCardContent, MatCardFooter } from '@angular/material/card';
import { ImageInputComponent } from '@ss/common/ui-image-input';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ss/common/ui-lang';
import { ActivePersonnelService } from '../active-personnel.service';

@Component({
    selector: 'ss-employee-detail',
    styleUrls: ['./employee-detail.component.scss'],
    templateUrl: './employee-detail.component.html',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCard,
        MatCardContent,
        ImageInputComponent,
        MatCardFooter,
        TranslateDirective,
        MatTabGroup,
        MatTab,
        MatFormField,
        MatLabel,
        MatInput,
        NgIf,
        MatError,
        DatePickerComponent,
        UiAutoCompleteComponent,
        MatRadioGroup,
        MatRadioButton,
        MatSelect,
        MatOption,
        NgFor,
        MatCheckbox,
        RouterOutlet,
        MatButton,
        AsyncPipe,
        TranslatePipe,
        MaterialModule]
})
export class EmployeeDetailComponent extends BaseEntityDetailComponent<Employee> {
    private lookupsSrv = inject(LookupsService);
    private usersSrv =  inject(UserListService);
    private router = inject(Router);
    private decisionSrv = inject(EmployeeDecisionService);
    private punishmentSrv = inject(PunishmentService);
    private languageSrv = inject(EmployeeLanguagesService);
    private trainingSrv = inject(EmployeeTrainingService);
    private diplomaSrv = inject(EmployeeDiplomaService);
    private childSrv = inject(EmployeeChildrenService);
    private spouseSrv = inject(EmployeeWivesService);
    private contractSrv = inject(EmployeeContractService);
    private oldCareerSrv = inject(EmployeeOldCareerService);
    private careerSrv = inject(EmployeeCareerService);
    private suspensionSrv = inject(EmployeeSuspensionService);
    private questioningSrv = inject(EmployeeQuestioningService);
    private invitationSrv = inject(EmployeeInvitationService);
    private reclassificationSrv = inject(EmployeeReclassificationService);
    private reintegrationSrv = inject(EmployeeReintegrationService);
    private unpaidLeaveSrv = inject(EmployeeUnpaidLeavesService);
    private activationSrv = inject(EmployeeActivationService);
    private bloodGroupSrv = inject(BloodGroupService);
    private citySrv = inject(CityService);
    private nationalitySrv = inject(NationalityService);
    private archiveSrv = inject(AppArchiveService);
    private HR_PANELS = [
        ACTIVATION_ROUTE_URL,       //00
        REINTEGRATION_ROUTE_URL,    //01
        CONTRACTS_ROUTE_URL,        //02
        CAREER_ROUTE_URL,           //03
        OLD_CAREER_ROUTE_URL,       //04
        RECLASSIFICATION_ROUTE_URL, //05
        DECISION_ROUTE_URL,         //06
        SUSPENSION_ROUTE_URL,       //07
        UNPAID_LEAVE_ROUTE_URL,     //08
        WIVES_ROUTE_URL,            //09
        CHILDREN_ROUTE_URL,         //10
        DIPLOMA_ROUTE_URL,          //11
        TRAINING_ROUTE_URL,         //12
        LANGUAGES_ROUTE_URL,        //13
        QUESTIONING_ROUTE_URL,      //14
        INVITATION_ROUTE_URL,       //15
        PUNISHMENT_ROUTE_URL,       //16
        ARCHIVE_ROUTE_URL,          //17
    ];
    private PAYROLL_PANELS = [
        ACTIVATION_ROUTE_URL, //0
    ]

    readonly MIN_DATE = new Date(new Date().getTime() - 16 * 366 * 24 * 60 * 60 * 1000);
    readonly dateValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
        const date = new Date(control.value);
        if (date == null || date.getTime() > this.MIN_DATE.getTime()) {
            return { 'invalidDate': { value: control.value } };
        }
        return null;
    }
    readonly ACTIVATION_ROUTE = 0;
    readonly REINTEGRATION_ROUTE = 1;
    readonly CONTRACTS_ROUTE = 2;
    readonly CAREER_ROUTE = 3;
    readonly OLD_CAREER_ROUTE = 4;
    readonly RECLASSIFICATION_ROUTE = 5;
    readonly DECISION_ROUTE = 6;
    readonly SUSPENSION_ROUTE = 7;
    readonly UNPAID_LEAVE_ROUTE = 8;
    readonly WIVES_ROUTE = 9;
    readonly CHILDREN_ROUTE = 10;
    readonly DIPLOMA_ROUTE = 11;
    readonly TRAINING_ROUTE = 12;
    readonly LANGUAGES_ROUTE = 13;
    readonly QUESTIONING_ROUTE = 14;
    readonly INVITATION_ROUTE = 15;
    readonly PUNISHMENT_ROUTE = 16;
    readonly ARCHIVE_ROUTE = 17;
    readonly FIXED_ELEMENTS_ROUTE = 112;

    activePanel: number = -1;
    noEdit = true;
    readonly PAYROLL_IEP = 1;
    readonly PAYROLL_OLD_ELEMENTS = 2;
    readonly PAYROLL_RANK = 3;
    readonly PAYROLL_POST = 4;

    fixedElementEditInProgress = false;
    hrMode = false;
    imageModel: ImageModel;
    nationalityModel = new DefaultAutoCompleteModel(this.nationalitySrv);
    cityLookup = new CityLookup(this.citySrv);
    userLookup = new UserLookup(this.usersSrv);
    maritalStatuses: MaritalStatus[];
    elementsForm: UntypedFormGroup = null;
    generationModes = [
        {id: 1, description: 'PAYROLL_IEP'},
        {id: 2, description: 'PAYROLL_OLD_ELEMENTS'},
        {id: 3, description: 'PAYROLL_SALARY_GRID'},
        {id: 4, description: 'PAYROLL_POST'},
    ];
    bloodGroups$ = this.bloodGroupSrv.getList(0, 50).pipe(map(res => res.body));
    elementDescriptions = signal<string[]>([]);

    constructor(
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public employeeSrv: EmployeeService,
        public httpSrv: HttpService,
        public infoSrv: FixedElementsEntryService,
        public activePersonnelSrv: ActivePersonnelService) {
        super(employeeSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_EDIT_EMPLOYEE');
        this.imageModel = new ImageModel(this.httpSrv);
    }

    loadEntity(id: number): Observable<Employee> {
        this.updateChildren(id);
        this.showPanel(this.ACTIVATION_ROUTE);
        this.subscriptions
            .push(this.router.events.pipe(filter((e: any): e is RouterEvent => e instanceof RouterEvent))
                .subscribe((e: RouterEvent) => {
                    this.noEdit = e.url.split('/').length < 7;
                    this.saveButton.visible = this.noEdit;
                    this.shellSrv.setGoBackEnabled(this.noEdit);
                }));
        return super.loadEntity(id);
    }

    private updateChildren(id: number) {
        this.decisionSrv.setParentId(id || 0);
        this.punishmentSrv.setParentId(id || 0);
        this.languageSrv.setParentId(id || 0);
        this.trainingSrv.setParentId(id || 0);
        this.diplomaSrv.setParentId(id || 0);
        this.childSrv.setParentId(id || 0);
        this.spouseSrv.setParentId(id || 0);
        this.contractSrv.setParentId(id || 0);
        this.oldCareerSrv.setParentId(id || 0);
        this.careerSrv.setParentId(id || 0);
        this.activationSrv.setParentId(id || 0);
        this.suspensionSrv.setParentId(id || 0);
        this.questioningSrv.setParentId(id || 0);
        this.invitationSrv.setParentId(id || 0);
        this.reclassificationSrv.setParentId(id || 0);
        this.reintegrationSrv.setParentId(id || 0);
        this.unpaidLeaveSrv.setParentId(id || 0);
    }

    public override preload(): Observable<MaritalStatus[]> {
        this.route.data.subscribe(data => {
            this.hrMode = !!data['hrMode'];
            this.activePersonnelSrv.set(!!data['active']);
        });
        return this.lookupsSrv
            .getMaritalStatuses()
            .pipe(
                tap((x: MaritalStatus[]) => this.maritalStatuses = x),
            );
    }

    private loadFixedElements(): Observable<ELine> {
        return this.infoSrv
            .load()
            .pipe(
                tap(() => this.elementDescriptions.set(this.infoSrv.loadDataCols().map(e => e.description))),
                switchMap(() => this.infoSrv.get(this.queryId)),
                tap(res => {
                    const elements = res.elements.length === 0 ?
                        this.infoSrv.loadDataCols().map(() => 0.0) :
                        res.elements;

                    this.elementsForm = this.formBuilder.group({
                        elements: this.formBuilder.array(elements)
                    });
                    this.elementsForm.disable();
                    this.fixedElementEditInProgress = false;
                }));
    }

    public override setupForm(p: Employee) {
        this.archiveSrv.appId = EMPLOYEE_ARCHIVES;
        this.loadFixedElements().subscribe();
        this.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(this.id), false);
        this.elementDescriptions.set(this.infoSrv.loadDataCols().map(e => e.description));

        return this.formBuilder.group({
            // birth info
            id:            [p.id],
            firstName:     [p.firstName, Validators.compose([Validators.required, Validators.maxLength(64)])],
            lastName:      [p.lastName, Validators.compose([Validators.required, Validators.maxLength(64)])],
            sex:           [p.sex||1, Validators.required],
            birthDate:     [p.birthDate, [Validators.required, this.dateValidator]],
            birthPlace:    [p.birthPlace, Validators.compose([Validators.required, Validators.maxLength(64)])],
            father:        [p.father, Validators.maxLength(64)],
            mother:        [p.mother, Validators.maxLength(64)],
            nationality:   [p.nationality],
            // social inf    o
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
            cmmsPerson:    [p.cmmsPerson || false, Validators.required],
            blood_group:   [p.blood_group],
            mutualno:      [p.mutualno],
            customCode:    [p.customCode, Validators.maxLength(12)],
            userId:        [p.userId]
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


    override uploadAttachments(id: number): Observable<any> {
        this.imageModel.setBackendUrl(this.employeeSrv.getPhotoUrl(id));
        return this.imageModel.submit('file');
    }

    get elementsFormArray(): UntypedFormArray {
        return this.elementsForm?.controls['elements'] as UntypedFormArray;
    }

    cancelElements() {
        this.loadFixedElements()
            .subscribe(() => this.saveButton.disabled = false);
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
                next: () => {
                    this.snackBarSrv.showSuccessMessage()
                    this.saveButton.disabled = false;
                },
                error: err => {
                    this.saveButton.disabled = false;
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                }
            });
        this.fixedElementEditInProgress = false;
        this.elementsForm.disable();
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
            ),
            switchMap(res => this.loadFixedElements().pipe(map(() => res))))
            .subscribe({
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

    showPanel(panel: number) {
        this.activePanel = panel;
        const panels = this.hrMode? this.HR_PANELS: this.PAYROLL_PANELS;
        if (panel < panels.length) {
            const dest = panels[panel];
            if (this.router.url.indexOf(dest) < 0) {
                this.router.navigate([dest], { relativeTo: this.route }).then();
            }
        }
    }

    protected goBack() {
        if (this.form.controls['id'].value > 0) {
            super.goBack();
        } else {
            this.router.navigate(['..', this.queryId], {relativeTo: this.route}).then();
        }
    }

    editFixedElements() {
        this.saveButton.disabled = true;
        this.fixedElementEditInProgress = true;
        this.elementsForm.enable();
    }
}

class CityLookup extends DefaultAutoCompleteModel<City> {
    constructor(citySrv: CityService) {
        super(citySrv);
    }

    override toString = (x: any) => x ? x[this.descriptionField]?.substring(0, 50) +
        (x.dairaDescription ? '/' + x.dairaDescription : '') +
        (x.wilayaDescription ? '/' + x.wilayaDescription : '') : null;

}
