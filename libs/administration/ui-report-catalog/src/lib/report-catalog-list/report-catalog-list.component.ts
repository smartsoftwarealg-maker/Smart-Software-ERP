import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {ReportCatalogService, ReportsCatalog} from '@ss/administration/api-report-catalog';
import {Observable} from 'rxjs';
import {ReportAppsService} from '@ss/common/api-reports';
import { ReactiveFormsModule, UntypedFormControl } from "@angular/forms";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {HttpParams} from '@angular/common/http';
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";

@Component({
    selector: 'ss-report-catalog-list',
    styleUrls: ['./report-catalog-list.component.scss'],
    templateUrl: './report-catalog-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule
    ],
})
export class ReportCatalogListComponent extends BaseEntityListComponent<ReportsCatalog> implements OnInit {

    applications: string[];
    applicationsCtrl = new UntypedFormControl();


    displayedColumns = [
        'description',
        'filename'
    ];

    constructor(
        public override entitySrv: ReportCatalogService,
        public reportService: ReportAppsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'ADMINISTRATION_REPORT_CATALOG');
        this.pagination.pageSize = 10;
    }

    override ngOnInit(): void {
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

    override processLoadedData(data: ReportsCatalog[]): Observable<ReportsCatalog[]> {
        return super.processLoadedData(data);
    }


    override getPage(): Observable<ReportsCatalog[]> {
        this.reportService.base = this.applicationsCtrl.value;
        const params = new HttpParams().set('base', this.applicationsCtrl.value);
        return this.entitySrv
            .getPage(this.pagination, this.filter, this.sortBy, params);
    }

    override showDetail(id: number) {
        this.router.navigate(['./' + id], {relativeTo: this.route}).then();
    }
}
