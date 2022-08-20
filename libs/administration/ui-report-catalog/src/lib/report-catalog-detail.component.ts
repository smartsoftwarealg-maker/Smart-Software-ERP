import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ReportCatalogService, ReportsCatalog} from '@ss/administration/api-report-catalog';
import {LIST_URL} from '@ss/common/api-common';
import {ReportAppsService, ReportListService} from '@ss/common/api-reports';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TraceabilityService} from '@ss/common/ui-traceability';
import {MatSelectChange} from '@angular/material/select';


@Component({
    selector: 'ss-report-catalog-detail',
    styleUrls: ['./report-catalog-detail.component.scss'],
    templateUrl: './report-catalog-detail.component.html'
})
export class ReportCatalogDetailComponent extends BaseEntityDetailComponent<ReportsCatalog> implements OnInit {
    app: string;
    reportList: string[] = [];
    applications: string[] = [];

    constructor(
        private traceSrv: TraceabilityService,
        private reportService: ReportAppsService,
        public reportCatalogService: ReportCatalogService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public reportListsService: ReportListService) {
        super(reportCatalogService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_REPORT_CATALOG');
    }


    ngOnInit(): void {
        this.reportService
            .getApps()
            .pipe(switchMap(res => {
                this.applications = res.map(e => e.toLowerCase());
                return this.getAppName();
            }))
            .subscribe(none => {
                super.ngOnInit();
                this.shellSrv.setGoBackPath('../' + LIST_URL, this.route, {app: this.app});
            });
    }


    finishLoading(e: ReportsCatalog) {
        this.reportListsService
            .getListByApp(this.app)
            .subscribe((res: string[]) => {
            this.reportList = res;
            super.finishLoading(e);
        });
    }


    getAppName(): Observable<any> {
        return this.route.queryParams.pipe(tap((p: any) => {
            if (!p.app) this.shellSrv.goBack();
            else this.app = p.app;
        }));
    }

    public setupForm(b: ReportsCatalog) {
        return this.formBuilder.group({
            id: [b.id],
            application:[null, Validators.required],
            description: [b.description, Validators.required],
            filename: [b.filename, Validators.compose([Validators.required])]
        });
    }

    public selectApp(event: MatSelectChange) {
        this.reportListsService
            .getListByApp(event.value.toLowerCase())
            .subscribe((res: string[]) => {
                this.reportList = res.filter(e => e.indexOf('forms') > 0);
            });
    }
}
