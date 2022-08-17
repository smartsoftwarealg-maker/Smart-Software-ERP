import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Bank, BankService} from '@ss/administration/api-bank';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Activity, ActivityService, LookupsService} from '@ss/common/api-lookup';
import {SSProject} from '@ss/scheduled-sales/api-scheduled-sales';
import {ProjectService} from '../project.service';
import {LoginService} from '@ss/common/api-common';
import {Agent, CustomerService} from '@ss/logistics/api-agent';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';

@Component({
  selector: 'ss-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent extends BaseEntityDetailComponent<SSProject> {
    public customerLookup = new DefaultAutoCompleteModel<Agent>(this.customerSrv, 'id', 'denomination')
    public activityLookup = new DefaultAutoCompleteModel<Activity>(this.activitySrv)

    constructor(
        public override entitySrv: ProjectService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private customerSrv: CustomerService,
        private activitySrv: ActivityService,
        private loginSrv: LoginService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_PROJECTS');
    }


    public setupForm(b: SSProject) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:           [b.id],
            centerId:     [b.centerId || this.loginSrv.appCtx.center],
            agentId:      [b.agentId, Validators.required],
            project_code: [b.project_code],
            description:  [b.description, Validators.required],
            start_date:   [b.start_date, Validators.required],
            finish_date:  [b.finish_date, Validators.required],
            qty:          [b.qty, Validators.required],
            monthly_rate: [b.monthly_rate, Validators.required],
            activity:     [b.activity]
        });
    }

}
