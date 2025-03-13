import { Component, inject, input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LookupsService } from '@ss/common/api-lookup';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { NestedTreeControl } from '@angular/cdk/tree';
import {
    ParamAutoCompleteModel,
    ParamValue,
    ReportNode,
    ReportParam, ReportParamLookupService,
    ReportParamsService,
    ReportTreeService,
    ReportViewData
} from '@ss/common/api-reports';
import { MatTree, MatTreeNestedDataSource } from '@angular/material/tree';
import {
    dateTimeToStr,
    HttpService,
    LanguageService,
    LoginService,
    MaterialModule,
    PaginatorPersistenceService
} from '@ss/common/api-common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { delay, Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map, switchMap } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';
import { CommonModule } from '@angular/common';


import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';


@Component({
    selector: 'ss-report-view',
    styleUrls: ['./report-view.component.scss'],
    templateUrl: './report-view.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,

        RouterModule,
        DatePickerComponent,
        UiAutoCompleteComponent
    ],
})
export class ReportViewComponent extends BaseEntityListComponent<ReportParam> implements OnInit, OnDestroy {
    private deviceService = inject( DeviceDetectorService);
    private paramLookupSrv = inject(ReportParamLookupService);

    @ViewChild('tree', { static: false }) tree: MatTree<unknown>;

    private uuid = '';
    isLTM = input(false);
    private readonly mimeMap = new Map([
        ['Excel', 'application/excel'],
        ['HTML', 'text/html'],
        ['PDF', 'application/pdf']
    ]);

    pdfSrc: string|null = null;
    htmlSrc: SafeHtml = null;
    generating = false;
    leftPaneHidden = false;
    isAndroid = false;
    form: UntypedFormGroup = null;
    params: unknown = null;
    displayedColumns = [
        'description',
        'valueString'
    ];

    reportTree: MatTreeNestedDataSource<ReportNode> = new MatTreeNestedDataSource();
    treeControl = new NestedTreeControl<ReportNode>(node => node.list);
    selectedReport: ReportNode;
    app: string;

    hasChild = (_: number, node: ReportNode) => !!node && node.list.length > 0;

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
        private loginSrv: LoginService,
        private httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(reportService, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_REPORTS');
        const os = this.deviceService.getDeviceInfo().os.toLowerCase();
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
            .getReportsTree(app, this.shellSrv.getSearchText())
            .subscribe((res: ReportNode) => {
                this.reportTree.data = this.parseTree(res.list, '');
                console.log(this.reportTree.data)
            });
    }

    parseTree(tree: ReportNode[], parent: string): ReportNode[] {
        return tree.map(x => {
            if (x.list.length > 0) x.list = this.parseTree(x.list, `${parent}/${x.name}`);
            x.parent = (x.parent || '') + (parent || '');
            return x;
        });
    }

    override getPage(): Observable<ReportParam[]> {
        return this.selectedReport? this.entitySrv.getPage(this.pagination, this.filter, this.sortBy,
            new HttpParams().set('report', `${this.app}/${this.selectedReport.parent}/${this.selectedReport.name}`)
                .set('app', this.app)) : of([]);
    }

    isReady(): boolean {
        return this.form != null && !this.shellSrv.loading;
    }

    reportSelect(reportNode: ReportNode) {
        this.form = null;
        this.selectedReport = reportNode;
        super.refresh(() => {
            const cc = {reportType: new FormControl<string>(''), name: new FormControl<string>('')};

            this.data.forEach(e => {
                cc[e.name] = new FormControl(this.isLTM() && e.typeName === 'java.sql.Timestamp'? e.valueString?.substring(0, 11) + '05:00:00' : e.valueString);
                if (e.lookupTable) {
                    e.lookupModel = new ParamAutoCompleteModel(this.paramLookupSrv, e.lookupTable);
                    e.description = e.description.substring(0, e.description.indexOf('//'));
                }
            });
            cc['reportType'] = new FormControl(this.isLTM()? 'HTML' : 'PDF');
            this.form = new FormGroup(cc);
        });
    }

    parseValueList(valueList: { description: string }[]) {
        return valueList?.map(x => x.description).join(' ');
    }

    generateReport() {
        this.releasePdf();
        this.htmlSrc = null;
        this.generating = true;
        this.uuid = this.selectedReport.name.replace('.jasper', '') + '-' + this.loginSrv.appCtx.id + '-' + new Date().getTime();
        const data: ReportViewData = {
            app: this.app + this.selectedReport.parent,
            rType: this.form.value.reportType,
            fileName: this.selectedReport.name.replace('.jasper', ''),
            uuid: this.uuid,
            paramList: this.createList()
        };

        const loop: Observable<unknown> = this.httpSrv
            .get(`/reports/view?uuid=${this.uuid}`)
            .pipe(delay(3000),
                switchMap(res => res['processing'] ? loop : of(res)));

        const obs = (this.form.value.reportType === 'HTML') ?
            this.reportService.viewHTML(data) : this.reportService.viewPDF(data);

        obs.pipe(map(res => {
            if (this.form.value.reportType === 'HTML') {
                return res;
            } else {
                const obj: Blob = <Blob>res;
                return new Blob([obj], { type: this.getMimeType() });
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
                    if (this.isAndroid) {
                        this.leftPaneHidden = false;
                        this.writeThenOpenFile(res).then();
                    } else {
                        this.pdfSrc = URL.createObjectURL(res);
                        this.leftPaneHidden = true;
                    }
                } else {
                    this.htmlSrc = this.sanitizer.bypassSecurityTrustHtml(res);
                    this.leftPaneHidden = true;
                }
                this.generating = false;
            },
            error: err => {
                this.generating = false;
                this.leftPaneHidden = false;
                if (err.error) {
                    const json = String.fromCharCode.apply(null, new Uint8Array(err.error));
                    err.error = JSON.parse(json);
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
            .filter(p => this.form.controls[p.name] &&
                                     this.form.controls[p.name].value !== null &&
                                     this.form.controls[p.name].value !== '')
            .map(p => {
                return { name: p.name, value: this.defaultValue(p.name, p.typeName) };
            });
    }


    private defaultValue(ctrlName: string, typeName: string): any {
        const value = this.form.controls[ctrlName].value;
        return typeName === 'java.sql.Timestamp'? dateTimeToStr(value).substring(0, 19):
            value === false? 'false' : value === true? 'true' : value;
    }

    private async writeThenOpenFile(fileBlob: any): Promise<void> {
        const str = await this.blobToBse64(fileBlob);
        const temp1 = await Filesystem.writeFile({
            path: 'report.pdf',
            data: str,
            directory: Directory.Documents,
        });

        const path = await Filesystem.getUri({
            path: 'report.pdf',
            directory: Directory.Documents
        });
        return  await FileOpener.open({ filePath: path.uri });
    }

    private blobToBse64(blob: Blob): Promise<string> {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(<string>reader.result);
            };
        });
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

    refresh(callback?: () => void) {
        this.reportsService
            .getReportsTree(this.app, this.shellSrv.getSearchText())
            .subscribe((res: any) => {
                this.reportTree.data = this.parseTree(res.list, '');
                super.refresh(callback);
            });
    }
    protected canShowProcessingStatus(): boolean {
        return false;
    }

    saveParams() {
        this.htmlSrc = null;
        this.generating = true;
        this.uuid = this.selectedReport.name.replace('.jasper', '') + '-' + this.loginSrv.appCtx.id + '-' + new Date().getTime();
        const data: ReportViewData = {
            app: this.app + this.selectedReport.parent,
            rType: this.form.value.reportType,
            fileName: this.selectedReport.name.replace('.jasper', ''),
            uuid: null,
            paramList: this.createList()
        };


        this.httpSrv
            .post(`/reports/save-params`, data)
            .subscribe({
            next: res => {
                this.generating = false;
                if (res['count']) {
                    this.snackBarSrv.showSuccessMessage();
                }
                this.generating = false;
            },
            error: err => {
                this.generating = false;
                throw err;
            }
        });
    }

}
