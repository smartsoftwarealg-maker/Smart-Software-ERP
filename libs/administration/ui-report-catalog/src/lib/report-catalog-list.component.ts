import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ReportCatalogService, ReportsCatalog} from '@ss/administration/api-report-catalog';
import {Observable} from 'rxjs';
import {ReportAppsService} from '@ss/common/api-reports';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'ss-report-catalog-list',
    styleUrls: ['./report-catalog-list.component.scss'],
    templateUrl: './report-catalog-list.component.html'
})
export class ReportCatalogListComponent extends BaseEntityListComponent<ReportsCatalog> implements OnInit {

    applications: string[];
    applicationsCtrl = new FormControl();


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
        this.pagination.pageSize = 10;
    }

    ngOnInit(): void {
        super.ngOnInit();
        // this.shellSrv.setTitle(this.title);
        // this.shellSrv.setGoBackPath('../..', this.route);
        // this.shellSrv.enableSearch('COMMON_SEARCH', o => o.subscribe(f => this.setFilter(f)));
        // this.shellSrv.setButtons([this.refreshButton, this.addButton, this.editButton, this.deleteButton]);
        this.pagination.onChange = () => this.refresh();
        this.reportService.getApps().subscribe(x => {
            this.applications = x;
        });
    }

    processLoadedData(data: ReportsCatalog[]): Observable<ReportsCatalog[]> {
        return super.processLoadedData(data);
    }

    // readAppFromQueryParam() {
    //     this.route.queryParams.subscribe(x => {
    //         if (x && x.app) {
    //             this.appForm.updateValueAndValidity();
    //         }
    //     });
    // }


    getPage(): Observable<ReportsCatalog[]> {
        const params = new HttpParams().set('base', this.applicationsCtrl.value);
        return this.entitySrv
            .getPage(this.pagination, this.filter, this.sortBy, params);
    }

    showDetail(id: number) {
        this.router.navigate(['./' + id], {relativeTo: this.route}).then();
    }
}
