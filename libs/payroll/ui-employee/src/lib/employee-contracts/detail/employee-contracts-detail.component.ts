import { Component, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {Contract, ContractMotiveService, EmployeeContractService} from '@ss/payroll/api-employee';
import {
    Post,
    Department,
    Division,
    Service,
    Category,
    DepartmentService,
    DivisionService,
    ServiceService,
    ActivePostService
} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { GridService } from '@ss/payroll/salary-grid';

import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MaterialModule } from '@ss/common/api-common';
import { ActivePersonnelService } from '../../active-personnel.service';


@Component({
    selector: 'ss-emp-contract-detail',
    templateUrl: './employee-contracts-detail.component.html',
    styleUrls: ['./employee-contracts-detail.component.scss'],
    standalone: true,
    imports: [MaterialModule, MatMiniFabButton, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, DatePickerComponent, MatError, UiAutoCompleteComponent]
})
export class EmployeeContractsDetailComponent extends BaseChildEntityDetailComponent<Contract> {
    private gridSrv = inject(GridService);
    private formBuilder = inject(UntypedFormBuilder);
    private postSrv =  inject(ActivePostService);
    private motiveSrv =  inject(ContractMotiveService);
    private departmentSrv = inject(DepartmentService);
    private divisionSrv = inject(DivisionService);
    private serviceSrv = inject(ServiceService);
    private activePersonnelSrv = inject(ActivePersonnelService);

    postLookup = new DefaultAutoCompleteModel(this.postSrv);
    motiveLookup = new DefaultAutoCompleteModel(this.motiveSrv);
    departmentLookup = new DefaultAutoCompleteModel(this.departmentSrv);
    divisionLookup = new DefaultAutoCompleteModel(this.divisionSrv);
    serviceLookup = new DefaultAutoCompleteModel(this.serviceSrv);
    gridLookup = new DefaultAutoCompleteModel(this.gridSrv);

    // entity: Contract;
    posts: Post[] = [];
    departments: Department[] = [];
    divisions: Division[] = [];
    services: Service[] = [];
    categories: Category[] = [];

    parentId = 0;

    constructor(public employeeContractSrv: EmployeeContractService) {
        super(employeeContractSrv, 'Contract');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.isEditable = this.activePersonnelSrv.val;
    }

    setupForm(a: Contract): UntypedFormGroup {
        // this.entity = a;
        return this.form = this.formBuilder.group({
            id:               [a.id],
            parentId:         [a.parentId || this.employeeContractSrv.getParentId()],
            centerId:         [a.centerId | this.loginSrv.appCtx.center],
            number:           [a.number, Validators.required],
            info:             [a.info],
            post:             [a.post, Validators.required],
            recordNumber:     [a.recordNumber, Validators.required],
            date:             [a.date||new Date()],
            valid_date:       [a.valid_date],
            division:         [a.division],
            department:       [a.department],
            service:          [a.service],
            salary_rank:      [a.salary_rank],
            salarygrid:       [a.salarygrid],
            fromdate:         [a.fromdate, Validators.required],
            todate:           [a.todate],
            trial_period:     [a.trial_period, Validators.required],
            related_contract: [a.related_contract],
            basesalary:       [a.basesalary],
            notes:            [a.notes],
            motive:           [a.motive],
            cost_center:      [a.cost_center],
            type:             [a.ctype],
            project:          [a.project],
            confirmed:        [a.confirmed]
        });
    }
}
