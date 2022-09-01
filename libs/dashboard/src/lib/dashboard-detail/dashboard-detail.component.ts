import {Component, OnInit} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Dashboard} from '../dashboard';
import {DashboardService} from '../dashboard.service';
import {AgentService} from '@ss/logistics/api-agent';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';

@Component({
    selector: 'ss-dashboard-detail',
    templateUrl: './dashboard-detail.component.html',
    styleUrls: ['./dashboard-detail.component.scss']
})
export class DashboardDetailComponent extends BaseEntityDetailComponent<Dashboard> implements OnInit {
    applications = this.lookupsSrv.getApplicationList();

    constructor(public dashboardSrv: DashboardService,
                public agentSrv: AgentService,
                public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public formBuilder: UntypedFormBuilder,
                public confirmationSrv: ConfirmationDialogService,
                public lookupsSrv: LookupsService) {
        super(dashboardSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_DASHBOARD')
    }

    setupForm(a: Dashboard): UntypedFormGroup {
        return this.formBuilder.group({
            id: [a.id],
            description: [a.description],
            appId: [a.appId, Validators.required],
            query: [a.query],
        });
    }
}
