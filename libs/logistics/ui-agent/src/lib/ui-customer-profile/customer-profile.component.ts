import { Component, inject, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ui-customer-profile',
    templateUrl: './customer-profile.component.html',
    styleUrls: ['./customer-profile.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
    ],

})
export class CustomerProfileComponent implements OnInit {
    private shellSrv =  inject(ShellService);
    private loginSrv =  inject(LoginService);
    public route =  inject(ActivatedRoute);
    private fb =  inject(UntypedFormBuilder);
    public snackBarSrv =  inject(SnackBarService);
    private agentSrv =  inject(AgentService);

    form: UntypedFormGroup = null;
    agent: Agent = null;
    pwd1 = new UntypedFormControl();
    pwd2 = new UntypedFormControl();


    ngOnInit(): void {
        this.shellSrv.setTitle('COMMON_PROFILE');
        this.shellSrv.setGoBackPath('../..', this.route);
        this.agentSrv
            .currentCustomer()
            .subscribe(agent => {
                this.agent = agent;
                this.form = this.fb.group({
                    code: [{ value: agent.customerCode, disabled: true}],
                    denomination: [{ value: agent.denomination, disabled: true}],
                    address: [{ value: agent.address || '', disabled: true}],
                    phone: [{ value: agent.mobile || '', disabled: true}],
                    email: [{ value: agent.email || '', disabled: true}],
                });
            });
    }

    updatePassword() {
        if (this.pwd1.value === this.pwd2.value && this.agent != null) {
            this.agent.password = this.pwd1.value;
            this.agentSrv
                .updatePassword({ id: 0, agentId: this.loginSrv.appCtx.agentId, password: this.agent.password })
                .subscribe(res => this.snackBarSrv.showMessage('COMMON_SUCCESS', false, false));
        }
    }
}
