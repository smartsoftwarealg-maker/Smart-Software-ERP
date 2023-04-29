import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { LoginService } from '@ss/common/api-common';
import { ActivatedRoute } from '@angular/router';
import { Employee, EmployeeService } from '@ss/payroll/api-employee';

@Component({
    selector: 'ss-employee-profile',
    templateUrl: './employee-profile.component.html',
    styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent {
    private employee: Employee = null;
    form: UntypedFormGroup = null;
    pwd1 = new UntypedFormControl();
    pwd2 = new UntypedFormControl();

    constructor(private shellSrv: ShellService,
        private loginSrv: LoginService,
        public route: ActivatedRoute,
        private fb: UntypedFormBuilder,
        public snackBarSrv: SnackBarService,
        private employeeSrv: EmployeeService) { }

    ngOnInit(): void {
        this.shellSrv.setTitle('COMMON_PROFILE');
        this.employeeSrv
            .get(this.loginSrv.appCtx.personId || 0)
            .subscribe(res => {
                this.employee = res;
                this.form = this.fb.group({
                    id: [{ value: res.id, disabled: true}],
                    firstName: [{ value: res.firstName, disabled: true}],
                    lastName: [{ value: res.lastName, disabled: true}],
                    address: [{ value: res.address1 || '', disabled: true}],
                    phone: [{ value: res.mobile || '', disabled: true}],
                    email: [{ value: res.email || '', disabled: true}],
                });
            });
        this.shellSrv.setGoBackPath('../../', this.route);
        this.shellSrv.updateShell();
    }

    updatePassword() {
        if (this.pwd1.value === this.pwd2.value && this.employee != null) {
            this.employee.password = this.pwd1.value;
            this.employeeSrv
                .updatePassword({ id: 0, agentId: this.loginSrv.appCtx.agentId, password: this.employee.password })
                .subscribe(res => this.snackBarSrv.showMessage('COMMON_SUCCESS', false, false));
        }
    }
}
