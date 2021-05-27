import {Component, OnDestroy, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {NestedTreeControl} from '@angular/cdk/tree';
import {ReportTreeService} from '@ss/common/api-reports';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {LanguageService} from '@ss/common/ui-lang';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ReportParams, ReportParamsService} from '@ss/common/api-report-param';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {map, tap} from 'rxjs/operators';
import {saveAs} from 'file-saver';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {DeviceDetectorService} from 'ngx-device-detector';
import {File} from '@ionic-native/file/ngx';

interface ReportNode {
    name: string;
    list: [];
    parent: '';
}
interface ParamValue {
    name: string;
    value: string | boolean | number | Date;
}

@Component({
    selector: 'ss-report-params',
    styleUrls: ['./report-view.component.scss'],
    templateUrl: './report-view.component.html'
})
export class ReportViewComponent extends BaseEntityListComponent<ReportParams> implements OnInit, OnDestroy {
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
    form: FormGroup = null;
    params: any = null;
    displayedColumns = [
        'description',
        'valueString',
    ];

    reportTree: MatTreeNestedDataSource<ReportNode> = new MatTreeNestedDataSource();
    treeControl = new NestedTreeControl<any>(node => node.list);
    selectedReport: ReportNode;
    app: string;
    private file: File = new File();
    private fileOpener = new FileOpener();

    hasChild = (_: number, node: any) => !!node && node.list.length > 0;

    constructor(
        public reportsService: ReportTreeService,
        public reportService: ReportParamsService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        // private fileOpener: FileOpener,
        // private file: File,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private sanitizer: DomSanitizer,
        public langSrv: LanguageService,
        private deviceService: DeviceDetectorService) {
        super(reportService, shellSrv, snackBarSrv, route, router, confirmationSrv, 'COMMON_REPORTS')
        const os = deviceService.getDeviceInfo().os.toLowerCase();
        this.isAndroid = os === 'android' || os === 'ios';
    }

    ngOnInit(): void {
        this.shellSrv.setTitle(this.title);
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
            x.parent = (x.parent || '') + (parent || '');
            return x;
        });
    }

    getPage(): Observable<ReportParams[]> {
        return this.entitySrv.getPage(this.pagination, this.filter, this.sortBy,
            new HttpParams().set('report', `${this.selectedReport.parent}/${this.selectedReport.name}`)
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
            const cc =  { };

            this.data.forEach(e =>  {
                cc[e.name] = new FormControl(e.valueString);
            });
            cc['reportType'] = new FormControl('PDF');
            this.form = new FormGroup(cc);
        });
    }

    parseValueList(valueList) {
        return valueList?.map(x=>x.description).join(' ');
    }

    generateReport() {
        this.releasePdf();
        this.htmlSrc = null;
        this.generating = true;
        const data = {
            'app': this.app + this.selectedReport.parent,
            'rType': this.form.value.reportType,
            'fileName': this.selectedReport.name.replace('.jasper', ''),
            'paramList': this.createList()
        };
        const obs = (this.form.value.reportType === 'HTML') ?
            this.reportService.httpSrv.postHTML('/reports/view', data) :
            this.reportService.httpSrv.postBlob('/reports/view', data);

       obs.pipe(map(res => {
            if (this.form.value.reportType === 'HTML') {
                return res;
            } else {
                const obj: Blob = <Blob> res;
                return new Blob([obj], {type: this.getMimeType()});
            }
        })).subscribe(res => {
            if (this.isAndroid && this.form.value.reportType === 'PDF') {
                this.writeThenOpenFile(res);
            } else {
                if (this.form.value.reportType === 'EXCEL') {
                    saveAs(res, 'excel.xlsx');
                } else if (this.form.value.reportType === 'PDF') {
                    this.pdfSrc = URL.createObjectURL(res);
                    this.leftPaneHidden = true;
                } else {
                    this.htmlSrc = this.sanitizer.bypassSecurityTrustHtml(res);
                    this.leftPaneHidden = true;
                }
            }
           this.generating = false;
        }, err => {
            this.generating = false;
            this.leftPaneHidden = false;
            return err;
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

    ngOnDestroy(): void {
        this.releasePdf();
        this.shellSrv.reset();
    }

    createList(): ParamValue[] {
        const list: ParamValue[] = [];
        return this.data
            .filter(p => this.form.controls[p.name])
            .map(p => {
                return {name: p.name, value: this.form.controls[p.name].value}
            });
    }

    private writeThenOpenFile(fileBlob: any) {
        // const fs = this.file.externalApplicationStorageDirectory;
        // this
        //     .file
        //     .writeFile(fs,
        //         'report.pdf',
        //         fileBlob,
        //         {replace: true}
        //     ).then(res => {
        //     this.fileOpener.open(
        //         res.toInternalURL(),
        //         'application/pdf'
        //     ).catch(err => window.alert(err));
        // }).catch((err) => window.alert(err));
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
