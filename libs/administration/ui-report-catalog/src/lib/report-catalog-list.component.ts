import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ReportCatalogService, ReportsCatalog} from '@ss/administration/api-report-catalog';
import {Observable} from 'rxjs';
import {ReportAppsService} from '@ss/common/api-reports';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {DefaultReportService} from '@ss/common/ui-default-report-component';

@Component({
    selector: 'ss-report-catalog-list',
    styleUrls: ['./report-catalog-list.component.scss'],
    templateUrl: './report-catalog-list.component.html'
})
export class ReportCatalogListComponent extends BaseEntityListComponent<ReportsCatalog> implements OnInit {

    appsList: string[];
    app!: string;

    appForm = new FormGroup({
        selectedApp: new FormControl(null, Validators.required)
    });

    displayedColumns = [
        'description',
        'filename'
    ];

    constructor(
        public reportCatalogService: ReportCatalogService,
        public reportService: ReportAppsService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService) {
        super(reportCatalogService, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'ADMINISTRATION_REPORT_CATALOG');
        this.pagination.pageSize = 20;
    }


    ngOnInit(): void {
        this.shellSrv.setTitle(this.title);
        this.shellSrv.setGoBackPath('../..', this.route);
        this.shellSrv.enableSearch('COMMON_SEARCH', o => o.subscribe(f => this.setFilter(f)));
        this.shellSrv.setButtons([this.refreshButton, this.addButton, this.editButton, this.deleteButton]);
        this.pagination.onChange = () => this.refresh();

        this.updateAddButtonStatus();

        // this.loadApps();
        //
        // this.appForm.valueChanges.subscribe(x => {
        //     this.setSelectedApp(x.selectedApp);
        // });
        this.route.data.subscribe(res => this.setSelectedApp(res['app']));
    }

   processLoadedData(data: ReportsCatalog[]): Observable<ReportsCatalog[]> {
       return super.processLoadedData(data);
   }

    loadApps(): void {
        this.reportService.getApps().subscribe(x => {
            this.appsList = x;
            this.readAppFromQueryParam();
        });
    }

    readAppFromQueryParam() {
        this.route.queryParams.subscribe(x => {
            if (x && x.app) {
                this.setSelectedApp(x.app);
                this.appForm.controls.selectedApp.patchValue(this.app);
                this.appForm.updateValueAndValidity();
            }
        });
    }

    setSelectedApp(app: any) {
        this.app = app;
        this.updateAddButtonStatus();
        this.refresh();
    }

    updateAddButtonStatus() {
        this.shellSrv.setButtonEnabled(this.addButton, !!this.app);
    }

    getPage(): Observable<ReportsCatalog[]> {
        return this.entitySrv.getPage(this.pagination, this.filter, this.sortBy, new HttpParams().set('base', this.app));
    }


    showDetail(id: number) {
        const params = {
            app: this.app
        };
        this.router.navigate(['./' + id], {relativeTo: this.route, queryParams: params})
            .then();
    }
}
