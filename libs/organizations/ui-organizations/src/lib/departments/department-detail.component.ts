import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Division, Department, DivisionService, DepartmentService } from '@ss/organizations/api-organizations';
import { PersonAutocompleteClass } from '@ss/payroll-common';
import { EmployeeService } from '@ss/payroll/api-employee';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'ss-department-detail',
    templateUrl: './department-detail.component.html',
    styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent extends BaseEntityDetailComponent<Department> implements OnInit, OnDestroy {

    public form: FormGroup = null;
    public saving: boolean = false;
    public personAutoCompleteModel: PersonAutocompleteClass;

    constructor(
        public divisionsSrv: DivisionService,
        public departementSrv: DepartmentService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        private employeeSrv: EmployeeService) {
        super(departementSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_DEPARTMENT');
        this.personAutoCompleteModel = new PersonAutocompleteClass(this.employeeSrv);
    }

    protected getRouteParam(): Observable<any> {
        this.departementSrv.setParentId(0);
        return super.getRouteParam();
    }

    setupForm(a: Department): FormGroup {
        console.log(a);
        return this.form = this.formBuilder.group({
            description: [a.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            division: [a.division, Validators.required],
            responsible: [a.responsible, Validators.required]
        });
    }

    public readForm(): Department {
        const formVal = this.form.value as Department;
        return formVal;
    }
}
