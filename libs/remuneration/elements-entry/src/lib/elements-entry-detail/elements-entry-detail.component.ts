import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ELine} from '../elements-entry-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {
    ReactiveFormsModule,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LookupsService, MaritalStatusService } from '@ss/common/api-lookup';
import {ElementsEntryService} from '../services/elements-entry.service';
import {MatSelectChange} from '@angular/material/select';
import { ImageInputComponent, ImageModel } from '@ss/common/ui-image-input';
import { HttpService, MaterialModule } from "@ss/common/api-common";
import { EmployeeService } from '@ss/employee-services/employee-services';



import { DatePickerComponent } from "@ss/common/ui-datepicker";


import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { FundService } from '@ss/payroll/api-employee';
import { BankService } from '@ss/administration/api-bank';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { PaymentModeService } from '../services/payment-mode.service';

type Employee = {
    id: number;
    fullName: string;
    post?: string;
    imageModel: ImageModel;
}
@Component({
    selector: 'ss-elements-entry-detail',
    templateUrl: './elements-entry-detail.component.html',
    styleUrls: ['./elements-entry-detail.component.scss', '../common-css.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
    ImageInputComponent,
    UiAutoCompleteComponent
]
})
export class ElementsEntryDetailComponent extends BaseEntityDetailComponent<ELine> implements OnInit {
    #fundSrv = inject(FundService);
    #httpSrv = inject(HttpService);
    #bankSrv = inject(BankService);
    #payModeSrv = inject(PaymentModeService);
    #maritalStatusSrv = inject(MaritalStatusService);

    fund1Lookup = new DefaultAutoCompleteModel(this.#fundSrv);
    fund2Lookup = new DefaultAutoCompleteModel(this.#fundSrv);
    bankLookup = new DefaultAutoCompleteModel(this.#bankSrv);
    payModeLookup = new DefaultAutoCompleteModel(this.#payModeSrv);
    maritalStatusLookup = new DefaultAutoCompleteModel(this.#maritalStatusSrv);

    imageModel: ImageModel;
    employee: Employee = null;

    readonly VARIABLE = 1;
    readonly FIXED = 2;

    constructor(
        public infoSrv: ElementsEntryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private employeeSrv: EmployeeService,) {
        super(infoSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'REMUN_ELEMENTS_ENTRY');
        this.imageModel = new ImageModel(this.#httpSrv);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.infoSrv.load();
    }

    public override setupForm(e: ELine): UntypedFormGroup {
        // this.shellSrv.setLoading(false);
        this.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(e.id), false);


        this.employee = {
            id: e.id,
            fullName: e.firstName + ' ' + e.lastName,
            post: e.post,
            imageModel: this.imageModel
        }
        const form = this.formBuilder.group({
            id:        [e.id],
            firstName: [e.firstName || 'first name'],
            lastName:  [e.lastName],
            post:      [e.post],
            fund1:     [0],
            fund2:     [0],
            bank:      [0],
            payMode:   [0],
            accountNo: [''],
            eId:       [0],
            maritalStatus: [null],
            elements: this.formBuilder.array(e.elements),
        });
        this.infoSrv
            .getInfo(e?.id||0)
            .subscribe(res => {
                form.controls['fund1'].setValue(res.fund1);
                form.controls['fund2'].setValue(res.fund2);
                form.controls['bank'].setValue(res.bank);
                form.controls['payMode'].setValue(res.payMode);
                form.controls['accountNo'].setValue(res.accountNo);
                form.controls['eId'].setValue(res.id);
                form.controls['maritalStatus'].setValue(res.maritalStatus);
            });
        return form;
    }

    get elementsForm(): UntypedFormArray {
        return this.form.controls['elements'] as UntypedFormArray;
    }

    selectInput(ev: MatSelectChange) {
        this.infoSrv.selectedInput = ev.value;
        this.infoSrv.loadDataCols();
        this.load();
    }

    setSelectionMode(mode: number) {
        this.infoSrv.selectionMode = mode;
        this.infoSrv.loadDataCols();
        this.load();
        this.checkAccessRights();
    }

    private checkAccessRights() {
        const entity = this.infoSrv.selectionMode == this.FIXED? 'FixedElement' : 'Element';
        const rights = this.shellSrv.getEntityRights(entity);
        this.saveButton.disabled = rights && !rights.write;
    }
    override readForm(): ELine {
        const data = super.readForm();
        data.cols = this.infoSrv.colsString();
        return data;
    }

    canShowProcessingStatus() {
        return false;
    }

}
