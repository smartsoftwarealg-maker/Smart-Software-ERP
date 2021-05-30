import {Injectable} from '@angular/core';
import {LanguageService} from '@ss/common/ui-lang';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {DefaultReportComponent} from './ui-default-report/default-report.component';
import {HttpParams} from '@angular/common/http';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})

export class DefaultReportService {
    constructor(private langSrv: LanguageService,
                private matDialog: MatDialog,
                private httpSrv: HttpService) {}

    public open(app: string, form: string): Observable<boolean> {
        const config = new MatDialogConfig();
        config.disableClose = true;
        config.height = '400px';
        config.width = '500px';
        config.maxWidth = '100%';
        config.data = { app: app, form: form };
        return this.matDialog
            .open(DefaultReportComponent, config)
            .afterClosed();
    }

    viewReport(form: string, id: number): Observable<any> {
        const params = new HttpParams()
            .set('form', form)
            .set('id', '' + id)
            .set('type', 'PDF');
        return this.httpSrv
            .getBlob('/reports/view', params);
    }

    setUserReport(form: string, report: string): Observable<number> {
        return this.httpSrv.post('/reports', { form: form, report: report});
    }
}
