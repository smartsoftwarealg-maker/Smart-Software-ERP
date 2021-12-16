import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Dashboard} from '../dashboard';
import {DashboardService} from '../dashboard.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {LookupsService} from '@ss/common/api-lookup';

@Component({
  selector: 'ss-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent extends BaseEntityListComponent<Dashboard> {
    displayedColumns = [
        'description',
    ];

  constructor(public dashboardSrv: DashboardService,
              public shellSrv: ShellService,
              public snackBarSrv: SnackBarService,
              public route: ActivatedRoute,
              public router: Router,
              public confirmationSrv: ConfirmationDialogService,
              public defReportSrv: DefaultReportService,
              public lookupsSrv: LookupsService) {
      super(dashboardSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'COMMON_DASHBOARD_QUERIES');
  }
}
