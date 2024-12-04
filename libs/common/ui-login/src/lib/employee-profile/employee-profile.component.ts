import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { LoginService } from '@ss/common/api-common';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '@ss/employee-services/employee-services';
import { Employee } from '@ss/employee-services/employee-services';
import { NgIf } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'ss-employee-profile',
    templateUrl: './employee-profile.component.html',
    styleUrls: ['./employee-profile.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        MatButton,
    ],
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
                .subscribe(() => this.snackBarSrv.showMessage('COMMON_SUCCESS', false, false));
        }
    }
}
