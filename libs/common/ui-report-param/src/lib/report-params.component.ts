import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {LookupsService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {NestedTreeControl} from "@angular/cdk/tree";
import {ReportTreeService} from "@ss/common/api-reports";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {LanguageService} from "@ss/common/ui-lang";
import {BaseEntityListComponent} from "@ss/common/api-base-entity";
import {ReportParams, ReportParamsService} from "@ss/common/api-report-param";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";


interface ReportNode {
    name: string;
    list: [];
    parent: '';
}

@Component({
    selector: 'ss-report-params',
    styleUrls: ['./report-params.component.scss'],
    templateUrl: './report-params.component.html'
})
export class ReportParamsComponent extends BaseEntityListComponent<ReportParams> implements OnInit {

    displayedColumns = [
        'name',
        'description',
        'valueString',
        'valueList'
    ];

    reportTree: MatTreeNestedDataSource<ReportNode> = new MatTreeNestedDataSource();
    treeControl = new NestedTreeControl<any>(node => node.list);
    selectedReport: ReportNode;
    app: string;

    hasChild = (_: number, node: any) => !!node && node.list.length > 0;


    constructor(
        public reportsService: ReportTreeService,
        public reportParamService: ReportParamsService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService) {
        super(reportParamService, shellSrv, snackBarSrv, route, router, confirmationSrv, 'COMMON_REPORT_PARAMS')
    }

    ngOnInit(): void {
        this.shellSrv.setTilte(this.title);
        this.shellSrv.setGoBackPath('../..', this.route);
        this.shellSrv.enableSearch('COMMON_SEARCH', o => o.subscribe(f => this.setFilter(f)));
        this.shellSrv.setButtons([this.refreshButton]);
        this.pagination.onChange = () => this.refresh();

        this.route.data.subscribe(res => {
            this.loadReportTree(res.reportBase);
            this.app = res.app;
        });
    }

    loadReportTree(app: string) {
        this.reportsService.getReportsTree(app).subscribe((res: any) => {
            this.reportTree.data = this.parseTree(res.list, '');
        });
    }

    parseTree(tree, parent): ReportNode[] {
        return tree.map(x => {
            if (x.list.length > 0) x.list = this.parseTree(x.list, `${parent}/${x.name}`);
            x.parent = parent;
            return x;
        });
    }

    getPage(): Observable<ReportParams[]> {
        return this.entitySrv.getPage(this.pagination, this.filter, this.sortBy,
            new HttpParams().set('report', `${this.selectedReport.parent}/${this.selectedReport.name}`)
                .set('app', this.app)
        );
    }


    reportSelect(reportNode: ReportNode) {
        this.selectedReport = reportNode;
        this.refresh();
    }
}
