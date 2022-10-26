import {Component, OnInit} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Dashboard} from '../dashboard';
import {DashboardService} from '../dashboard.service';
import {AgentService} from '@ss/logistics/api-agent';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {
    APP_ASSET,
    APP_DASHBOARD,
    APP_HR,
    APP_PAYROLL,
    APP_PURCHASE,
    APP_STOCK, APP_TREASURY,
    getApplicationId
} from '@ss/common/api-common';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'ss-dashboard-detail',
    templateUrl: './dashboard-detail.component.html',
    styleUrls: ['./dashboard-detail.component.scss']
})
export class DashboardDetailComponent extends BaseEntityDetailComponent<Dashboard> implements OnInit {
    applications = this.lookupsSrv.getApplicationList();
    APPLICATIONS: Lookup[] = [{ id: APP_DASHBOARD, description: 'DASHBOARD' },
        { id: APP_PURCHASE,  description: 'PURCHASES' },
        { id: APP_STOCK,     description: 'STOCK'     },
        { id: APP_PAYROLL,   description: 'PAYROLL'   },
        { id: APP_HR,        description: 'HR'        },
        { id: APP_ASSET,     description: 'ASSETS'    },
        { id: APP_TREASURY,  description: 'TREASURY'  },
    ];

    constructor(public dashboardSrv: DashboardService,
                public agentSrv: AgentService,
                public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public formBuilder: UntypedFormBuilder,
                public confirmationSrv: ConfirmationDialogService,
                public lookupsSrv: LookupsService,
                private router: Router) {
        super(dashboardSrv,
              shellSrv,
              snackBarSrv,
              route,
              formBuilder,
              confirmationSrv,
              'COMMON_DASHBOARD')
        if (!this.dashboardSrv.getParentId()) {
            this.dashboardSrv.setParentId(getApplicationId(this.router));
        }
    }


    setupForm(a: Dashboard): UntypedFormGroup {
        return this.formBuilder.group({
            id: [a.id],
            description: [a.description],
            appId: [a.appId || this.dashboardSrv.getParentId(), Validators.required],
            query: [a.query],
        });

        this.subscriptions.push(
            this.form
                .controls['appId']
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(id => {
                    this.dashboardSrv.setParentId(id);
                    this.form.controls['appId'].setValue(id, { onlySelf: true });
                })
        );
    }
}
