import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import { Dashboard, DashboardCenter } from '../dashboard';
import {DashboardService} from '../services/dashboard.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import { FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {
    APP_ASSET,
    APP_DASHBOARD,
    APP_HR, APP_LTM,
    APP_PAYROLL,
    APP_PURCHASE, APP_SALES,
    APP_STOCK, APP_TREASURY, APPLICATIONS,
    getApplicationId, LoginService, MaterialModule
} from '@ss/common/api-common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';



import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CenterService } from '@ss/administration/api-center';
import { DashboardCenterService } from '../services/dashboard-center.service';
import { MatSelectionListChange } from '@angular/material/list';
import { Observable, tap } from 'rxjs';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-dashboard-detail',
    templateUrl: './dashboard-detail.component.html',
    styleUrls: ['./dashboard-detail.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    TranslatePipe,
    ReactiveFormsModule,
    UiAutoCompleteComponent
],
})
export class DashboardDetailComponent extends BaseEntityDetailComponent<Dashboard> implements OnInit {
    private centerSrv = inject(CenterService);
    private dashboardCenterSrv = inject(DashboardCenterService);
    private loginSrv = inject(LoginService);

    centerLookup = new DefaultAutoCompleteModel<Lookup>(this.centerSrv);
    centerCtrl = new FormControl<number>(0);
    private lookupsSrv =  inject(LookupsService);
    applications = this.lookupsSrv.getApplicationList();

    apps = APPLICATIONS;

    dashboardCenters: DashboardCenter[] = [];
    selectedCenter = 0;

    constructor(public dashboardSrv: DashboardService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                private router: Router) {
        super(dashboardSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'COMMON_DASHBOARD');
        if (!this.dashboardSrv.getParentId()) {
            this.dashboardSrv.setParentId(getApplicationId(this.router));
        }
        this.centerSrv.setParentId(this.loginSrv.appCtx.company);
    }


    loadEntity(id: number): Observable<Dashboard> {
        this.dashboardCenterSrv.setParentId(id ||0);
        return this.dashboardCenterSrv
            .getList(0, 1000)
            .pipe(tap(res => this.dashboardCenters = res.body),
                  switchMap(() => super.loadEntity(id)));
    }

    override setupForm(a: Dashboard): UntypedFormGroup {
        return this.formBuilder.group({
            id:          [a.id],
            description: [a.description],
            appId:       [a.appId || this.dashboardSrv.getParentId(), Validators.required],
            query:       [a.query],
        });
    }

    addCenter() {
        if (this.centerCtrl.value != null) {
            this.dashboardCenterSrv
                .save({ id: 0, parentId: this.id, centerId: this.centerCtrl.value })
                .pipe(switchMap(res => this.dashboardCenterSrv.getList(0, 1000)))
                .subscribe(res => {
                    this.dashboardCenters = res.body;
                    this.snackBarSrv.showSuccessMessage();
                });
        }
    }
    centerSelectionChanged(ev: MatSelectionListChange) {
        this.selectedCenter = ev.options[0].value || 0;
        const dbCenters = this.dashboardCenters.filter(e => e.id === this.selectedCenter);
        this.centerCtrl.setValue(dbCenters.length > 0 ? dbCenters[0].centerId : 0);
    }

    deleteCenter() {
        if (this.selectedCenter > 0) {
            this.dashboardCenterSrv
                .remove(this.selectedCenter)
                .pipe(switchMap(res => this.dashboardCenterSrv.getList(0, 1000)))
                .subscribe(res => {
                    this.selectedCenter = 0;
                    this.dashboardCenters = res.body;
                    this.snackBarSrv.showSuccessMessage();
                });
        }
    }
}
