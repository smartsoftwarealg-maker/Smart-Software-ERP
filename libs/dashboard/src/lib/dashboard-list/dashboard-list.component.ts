import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Dashboard} from '../dashboard';
import {DashboardService} from '../dashboard.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {
    APP_ASSET,
    APP_DASHBOARD,
    APP_HR,
    APP_LTM,
    APP_PAYROLL,
    APP_PURCHASE,
    APP_STOCK,
    APP_TREASURY,
    PaginatorPersistenceService
} from '@ss/common/api-common';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'ss-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent extends BaseEntityListComponent<Dashboard> {
    APPLICATIONS: Lookup[] = [{ id: APP_DASHBOARD, description: 'DASHBOARD' },
                              { id: APP_PURCHASE,  description: 'PURCHASES' },
                              { id: APP_STOCK,     description: 'STOCK'     },
                              { id: APP_PAYROLL,   description: 'PAYROLL'   },
                              { id: APP_HR,        description: 'HR'        },
                              { id: APP_ASSET,     description: 'ASSETS'    },
                              { id: APP_TREASURY,  description: 'TREASURY'  },
                              { id: APP_LTM,       description: 'LTM'  },
                             ];
    applicationCtrl = new FormControl(this.dashboardSrv.getParentId());
    displayedColumns = [
        'description',
    ];

  constructor(public dashboardSrv: DashboardService,
              public override shellSrv: ShellService,
              public override snackBarSrv: SnackBarService,
              public override route: ActivatedRoute,
              public override router: Router,
              public override confirmationSrv: ConfirmationDialogService,
              public override defReportSrv: DefaultReportService,
              public lookupsSrv: LookupsService,
              public override pagPersistSrv: PaginatorPersistenceService) {
      super(dashboardSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
          'COMMON_DASHBOARD_QUERIES');
      if (!this.dashboardSrv.getParentId()) {
          this.dashboardSrv.setParentId(1);
      }
  }

  override ngOnInit() {
      super.ngOnInit();
      this.subscriptions.push(
          this.applicationCtrl
              .valueChanges
              .pipe(debounceTime(300),
                  distinctUntilChanged()
              ).subscribe(id => {
                  this.dashboardSrv.setParentId(id);
                  this.refresh();
              }));
  }
}
