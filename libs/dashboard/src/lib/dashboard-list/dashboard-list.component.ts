import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Dashboard} from '../dashboard';
import {DashboardService} from '../services/dashboard.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {
    APP_ASSET,
    APP_DASHBOARD,
    APP_HR,
    APP_LTM,
    APP_PAYROLL,
    APP_PURCHASE, APP_SALES,
    APP_STOCK,
    APP_TREASURY, APPLICATIONS, MaterialModule,
    PaginatorPersistenceService
} from '@ss/common/api-common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { CommonModule } from '@angular/common';


import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-dashboard-list',
    templateUrl: './dashboard-list.component.html',
    styleUrls: ['./dashboard-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        PaginationComponent,
        TranslatePipe
    ]

})
export class DashboardListComponent extends BaseEntityListComponent<Dashboard> {
    applications = APPLICATIONS;
    applicationCtrl = new FormControl();
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
        this.applicationCtrl.setValue(this.dashboardSrv.getParentId());
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
