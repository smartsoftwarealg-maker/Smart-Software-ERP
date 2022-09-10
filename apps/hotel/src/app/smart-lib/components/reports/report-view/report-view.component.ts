import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../report-service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpService } from '../../../common/http.service';

@Component({
    selector: 'ss-report-catalog',
    templateUrl: './report-view.component.html',
    styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent implements OnInit, OnDestroy {
    private uuid = '';
    public appName;
    public dirList;
    public reportsList;
    public params;
    public selectedReport;
    public pdfSrc;
    public htmlSrc: SafeHtml;
    public selectedDir: {} = {};
    public generating = false;
    public leftPaneHidden = false;
    public isAndroid = false;
    public reportType = 'HTML';

    constructor(private router: Router,
        private _service: ReportService,
        private sanitizer: DomSanitizer,
        private httpSrv: HttpService,
        private deviceService: DeviceDetectorService) {
        const os = deviceService.getDeviceInfo().os.toLowerCase();
        this.isAndroid = os === 'android' || os === 'ios';
    }

    ngOnInit(): void {
        this.appName = 'hotel';
        this.getList();
    }

    logIt($event) {
        this.selectedReport = null;
        this.params = null;
    }

    public getList() {
        this
            ._service
            .get('/reports/list?filter=' + this.appName)
            .subscribe(res => {
                this.dirList = res.filter(item => item.files.length > 0);
                this.reportsList = res.filter(item => item.files.length === 0);
                if (this.dirList.length > 0) {
                    this.selectedDir = this.dirList[0];
                }
            });
    }

    public onReportSelect() {
        this._service.get('/reports/params?app=' + this.appName + '&report=' + this.selectedReport)
            .subscribe(res => {
                this.params = res;
                this.params.map(item => {
                    item.value = item.valueString;
                    delete item.valueString;
                });
                this.changeTypes();
            });
    }

    public changeTypes() {
        for (const item of this.params) {
            if (true || item.hasOwnProperty(item)) { // shuts up warning shit!
                item.typeName = this.replaceTypeAndFixValue(item);
                item.value = item.value === '""' ? '' : item.value;
            }
        }
    }

    public getInputsParams() {
        return this.params.filter(item => {
            return item.typeName === 'text' ||
                (item.typeName === 'number' && item.valueList === null);
        });
    }

    getDateParams() {
        return this.params.filter(item => item.typeName === 'date');
    }

    getBooleanParams() {
        return this.params.filter(item => item.typeName === 'checkbox');
    }

    getSelectParams() {
        return this.params.filter(item => item.valueList != null);
    }

    public replaceTypeAndFixValue(item) {
        let realType = '';
        switch (item.typeName) {
            case 'java.lang.String':
                realType = 'text';
                item.value = item.value === '""' || item.value === 'null' ? '' : item.value;
                break;
            case 'java.util.Date':
                realType = 'date';
                item.value = item.value === '""' || item.value === 'null' ? '' : this.backendStrToDate(item.value);
                break;
            case 'java.lang.Integer':
                item.value = item.value === '""' || item.value === 'null' ? '' : item.value;
                realType = 'number';
                break;
            case 'java.lang.Boolean':
                item.value = item.value === 'true';
                realType = 'checkbox';
                break;
            default:
                realType = 'text';
                break;
        }
        return realType;
    }

    backendStrToDate(x: string) {
        if (x == null) {
            return null;
        } else {
            const intArr = x.split('-').map(i => +i);
            return new Date(intArr[2], intArr[1] - 1, intArr[0]);
        }
    }

    dateToBackendStr(x: Date) {
        return x.getDate() + '-' + (x.getMonth() + 1) + '-' + x.getFullYear();
    }

    getMimeType(): string {
        if (this.reportType === 'EXCEL') {
            return 'application/excel';
        }
        if (this.reportType === 'HTML') {
            return 'text/html';
        }
        if (this.reportType === 'PDF') {
            return 'application/pdf';
        }
        return '';
    }

    generateReport() {
        this.releasePdf();
        this.htmlSrc = null;
        this.generating = true;
        const data = {
            app: this.appName + '/',
            rType: this.reportType,
            fileName: this.selectedReport.replace('.jasper', ''),
            paramList: this.createList(),
            uuid: this.uuid
        };

        let obsrv;

        if (this.reportType === 'HTML') {
            obsrv = this.httpSrv.postHTML('/reports/view', data);
        } else {
            obsrv = this._service.postBlob('/reports/view', data);
        }



        obsrv.pipe(map(res => {
            if (this.reportType === 'HTML') {
                return res;
            } else {
                const obj: Blob = <Blob>res;
                return new Blob([obj], { type: this.getMimeType() });
            }
        })).subscribe(res => {
            this.generating = false;
            if (this.isAndroid && this.reportType === 'PDF') {
                this.writeThenOpenFile(res);
            } else {
                if (this.reportType === 'EXCEL') {
                   // saveAs(res, 'excel.xlsx');
                   window.open(URL.createObjectURL(res));
                } else if (this.reportType === 'PDF') {
                    this.leftPaneHidden = true;
                    this.pdfSrc = URL.createObjectURL(res);
                } else {
                    this.leftPaneHidden = true;
                    this.htmlSrc = this.sanitizer.bypassSecurityTrustHtml(res);
                }
            }
        }, err => {
            this.generating = false;
            this.leftPaneHidden = false;
            throw err;
        });
    }


    private writeThenOpenFile(fileBlob: any) {
    }


    createList() {
        const list = [];
        for (const item of this.params.filter(i => i.value)) {
            let V = null;
            if (item.typeName === 'date') {
                V = this.dateToBackendStr(item.value);
            } else {
                V = item.value.toString();
            }
            list.push({ 'name': item.name, 'value': V });
        }
        return list;
    }

    public showLeftPane() {
        // FIXME: what????
        this.leftPaneHidden = !this.leftPaneHidden && !this.isAndroid;
        if (!this.leftPaneHidden) {
            this.releasePdf();
        }
    }

    public releasePdf() {
        if (this.pdfSrc) {
            URL.revokeObjectURL(this.pdfSrc);
            this.pdfSrc = null;
        }
    }

    ngOnDestroy(): void {
        this.releasePdf();
    }

}
