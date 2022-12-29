import {Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {NestedTreeControl} from '@angular/cdk/tree';
import {ReportTreeService} from '@ss/common/api-reports';
import {MatTree, MatTreeNestedDataSource} from '@angular/material/tree';
import {HttpService, LanguageService, LoginService, PaginatorPersistenceService} from '@ss/common/api-common';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ParamValue, ReportParam, ReportParamsService, ReportNode, ReportViewData} from '@ss/common/api-reports';
import {delay, Observable, of} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {map, switchMap} from 'rxjs/operators';
import {DeviceDetectorService} from 'ngx-device-detector';
import {DefaultReportService} from '@ss/common/ui-default-report-component';


@Component({
    selector: 'ss-report-view',
    styleUrls: ['./report-view.component.scss'],
    templateUrl: './report-view.component.html'
})
export class ReportViewComponent extends BaseEntityListComponent<ReportParam> implements OnInit, OnDestroy {
    @ViewChild('tree', { static: false }) tree: MatTree<any>;

    private uuid = '';
    private readonly mimeMap = new Map([
        ['Excel', 'application/excel'],
        ['HTML', 'text/html'],
        ['PDF', 'application/pdf'],
    ]);

    pdfSrc: any = null;
    htmlSrc: SafeHtml = null;
    generating = false;
    leftPaneHidden = false;
    isAndroid = false;
    form: UntypedFormGroup = null;
    params: any = null;
    displayedColumns = [
        'description',
        'valueString',
    ];

    reportTree: MatTreeNestedDataSource<ReportNode> = new MatTreeNestedDataSource();
    treeControl = new NestedTreeControl<any>(node => node.list);
    selectedReport: ReportNode;
    app: string;

    hasChild = (_: number, node: any) => !!node && node.list.length > 0;

    constructor(
        public reportsService: ReportTreeService,
        public reportService: ReportParamsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public sanitizer: DomSanitizer,
        public langSrv: LanguageService,
        public override defReportSrv: DefaultReportService,
        private deviceService: DeviceDetectorService,
        private loginSrv: LoginService,
        private httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(reportService, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_REPORTS')
        const os = deviceService.getDeviceInfo().os.toLowerCase();
        this.isAndroid = os === 'android' || os === 'ios';
    }

    override ngOnInit(): void {
        this.shellSrv.setTitle(this.title);
        this.shellSrv.setGoBackPath('../..', this.route);
        this.shellSrv.enableSearch('COMMON_SEARCH', o => o.subscribe(f => this.setFilter(f)));
        this.shellSrv.setButtons([this.refreshButton]);
        this.pagination.onChange = () => this.refresh();

        this.route.data.subscribe(res => {
            this.loadReportTree(res['reportBase']);
            this.app = res['reportBase'];
        });
    }

    loadReportTree(app: string) {
        this.reportsService
            .getReportsTree(app)
            .subscribe((res: any) => {
            this.reportTree.data = this.parseTree(res.list, '');
        });
    }

    parseTree(tree: any[], parent: any): ReportNode[] {
        return tree.map(x => {
            if (x.list.length > 0) x.list = this.parseTree(x.list, `${parent}/${x.name}`);
            x.parent = (x.parent || '') + (parent || '');
            return x;
        });
    }

    override getPage(): Observable<ReportParam[]> {
        return this.entitySrv.getPage(this.pagination, this.filter, this.sortBy,
            new HttpParams().set('report', `${this.app}/${this.selectedReport.parent}/${this.selectedReport.name}`)
                .set('app', this.app)
        );
    }

    isReady(): Boolean {
        return this.form != null && !this.shellSrv.loading;
    }

    reportSelect(reportNode: ReportNode) {
        this.form = null;
        this.selectedReport = reportNode;
        this.refresh(() => {
            const cc: any = {};

            this.data.forEach(e =>  {
                cc[e.name] = new UntypedFormControl(e.valueString);
            });
            cc['reportType'] = new UntypedFormControl('PDF');
            this.form = new UntypedFormGroup(cc);
        });
        if (this.tree) {
            this.tree.treeControl.collapseAll();
        }
    }

    parseValueList(valueList: { description: string }[]) {
        return valueList?.map(x=>x.description).join(' ');
    }

    generateReport() {
        this.releasePdf();
        this.htmlSrc = null;
        this.generating = true;
        this.uuid = this.selectedReport.name.replace('.jasper', '') + '-' + this.loginSrv.appCtx.id + '-' + new Date().getTime();
        const data: ReportViewData = {
            app:       this.app + this.selectedReport.parent,
            rType:     this.form.value.reportType,
            fileName:  this.selectedReport.name.replace('.jasper', ''),
            uuid:      this.uuid,
            paramList: this.createList()
        };

        const loop: Observable<any> = this.httpSrv
            .get(`/reports/view?uuid=${this.uuid}`)
            .pipe(delay(3000),
                switchMap(res => res['processing']? loop: of(res)));

        const obs = (this.form.value.reportType === 'HTML') ?
            this.reportService.viewHTML(data) : this.reportService.viewPDF(data);

        obs.pipe(map(res => {
            if (this.form.value.reportType === 'HTML') {
                return res;
            } else {
                const obj: Blob = <Blob>res;
                return new Blob([obj], {type: this.getMimeType()});
            }
        })).subscribe({
            next: res => {
                if (this.form.value.reportType === 'EXCEL') {
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(res);
                    link.download = this.selectedReport.name.replace('.jasper', '') + '.xlsx';
                    link.click();
                    setTimeout(() => window.URL.revokeObjectURL(link.href), 5000);
                } else if (this.form.value.reportType === 'PDF') {
                    this.pdfSrc = URL.createObjectURL(res);
                    this.leftPaneHidden = true;
                } else {
                    this.htmlSrc = this.sanitizer.bypassSecurityTrustHtml(res);
                    this.leftPaneHidden = true;
                }
                this.generating = false;
            }, error: err => {
                this.generating = false;
                this.leftPaneHidden = false;
                if (err.error) {
                    // const json = String.fromCharCode.apply(null, new Uint8Array(err.error));
                    // err.error = JSON.parse(json);
                    throw err;
                }
                return loop;
            }
        });
    }

    getMimeType(): string {
        return this.mimeMap.get(this.form.value.reportType) || '';
    }

    private releasePdf() {
        if (this.pdfSrc) {
            URL.revokeObjectURL(this.pdfSrc);
            this.pdfSrc = null;
        }
    }

    override ngOnDestroy(): void {
        this.releasePdf();
        this.shellSrv.reset();
    }

    createList(): ParamValue[] {
        return this.data
            .filter(p => this.form.controls[p.name])
            .map(p => {
                return { name: p.name, value: '' + this.form.controls[p.name].value }
            });
    }

    private writeThenOpenFile(fileBlob: any) {
    }

    private dateToBackendStr(x: Date) {
        return x.getDate() + '-' + (x.getMonth() + 1) + '-' + x.getFullYear();
    }

    public showLeftPane() {
        this.leftPaneHidden = !this.leftPaneHidden && !this.isAndroid;
        if (!this.leftPaneHidden) {
            this.releasePdf();
        }
    }
}
