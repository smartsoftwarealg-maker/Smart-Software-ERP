import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';
import { DepartmentService, Department } from '@ss/common/api-lookup';
import { PersonAutocompleteClass } from '@ss/payroll-common';
import { EmployeeService } from '@ss/payroll/api-employee';

@Component({
    selector: 'ss-department-detail',
    templateUrl: './department-detail.component.html',
    styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent extends BaseEntityDetailComponent<Department> implements OnInit, OnDestroy {

    public form: UntypedFormGroup = null;
    public saving: boolean = false;
    public personAutoCompleteModel: PersonAutocompleteClass;

    constructor(
        public departementSrv: DepartmentService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        private employeeSrv: EmployeeService,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService) {
        super(departementSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_DEPARTMENT');
        this.personAutoCompleteModel = new PersonAutocompleteClass(this.employeeSrv);
    }

    protected getRouteParam(): Observable<any> {
        this.departementSrv.setParentId(0);
        return super.getRouteParam();
    }

    setupForm(a: Department): UntypedFormGroup {
        console.log(a);
        return this.form = this.formBuilder.group({
            description: [a.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            responsible: [a.responsible]
        });
    }

    public readForm(): Department {
        const formVal = this.form.value as Department;
        return formVal;
    }
}
