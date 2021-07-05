import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '@ss/common/api-common';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ss-ui-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
 form: FormGroup = null;
 agent: Agent = null;
 pwd1 = new FormControl();
 pwd2 = new FormControl();

  constructor(private shellSrv: ShellService,
              private loginSrv: LoginService,
              public route: ActivatedRoute,
              private fb: FormBuilder,
              public snackBarSrv: SnackBarService,
              private agentSrv: AgentService) { }

  ngOnInit(): void {
      this.shellSrv.setTitle('COMMON_PROFILE');
      this.shellSrv.setGoBackPath('..', this.route);
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
