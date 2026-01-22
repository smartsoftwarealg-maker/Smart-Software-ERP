import {Injectable} from '@angular/core';
import {LanguageService} from '@ss/common/api-common';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Observable, of, switchMap} from 'rxjs';
import {DefaultReportComponent} from './ui-default-report/default-report.component';
import {HttpParams} from '@angular/common/http';
import {Company, HttpService} from '@ss/common/api-common';
import {EmailSenderComponent} from './ui-email-sender/email-sender.component';
import {tap} from 'rxjs/operators';
import { ReportViewData } from '@ss/common/api-reports';

@Injectable({
    providedIn: 'root'
})

export class DefaultReportService {
    private _company: Company = null;
    constructor(private langSrv: LanguageService,
                private matDialog: MatDialog,
                private httpSrv: HttpService) {}

    public open(app: string, form: string): Observable<{count: number}> {
        const config = new MatDialogConfig();
        config.disableClose = true;
        config.height = '400px';
        config.width = '500px';
        config.maxWidth = '100%';
        config.data = { app: app, form: form };
        return this.matDialog
            .open(DefaultReportComponent, config)
            .afterClosed()
            .pipe(switchMap(res => typeof res === 'string'? this.setUserReport(form, res) : of({ count: 0 })));
    }

    /*
        private selectReport() {
        this.defReportSrv
            .open(this.shellSrv.getApp(), this.reportForm)
            .subscribe(res => {
                if (typeof res === 'string') {
                    this.defReportSrv
                        .setUserReport(this.reportForm, res)
                        .subscribe(resp => {
                            if (resp.count > 0) {
                                this.snackBarSrv.showSuccessMessage();
                            }
                        })
                }
            });
    }

     */
    public openEmailDlg(from: string, to: string): Observable<boolean> {
        const config = new MatDialogConfig();
        config.disableClose = true;
        config.height = '450px';
        config.width = '500px';
        config.maxWidth = '100%';
        config.data = { from: from, to: to };
        return this.matDialog
            .open(EmailSenderComponent, config)
            .afterClosed();
    }

    viewReport(form: string, id: number): Observable<any> {
        const params = new HttpParams()
            .set('form', form)
            .set('id', id + '')
            .set('type', 'PDF');
        return this.httpSrv
            .getBlob('/reports/view', params);
    }

    viewReportWithData(form: string, data: string): Observable<any> {
        const params = new HttpParams()
            .set('form', form)
            .set('data', data)
            .set('type', 'PDF');
        return this.httpSrv
            .getBlob('/reports/view', params);
    }

    emailReport(app: string,
        id: number,
        form: string,
        from: string,
        to: string,
        password: string,
        subject: string,
        message: string): Observable<any> {
        const params = new HttpParams()
            .set('app', app)
            .set('id', id)
            .set('form', form)
            .set('from', from)
            .set('to', to)
            .set('pwd', password)
            .set('message', message)
            .set('subject', subject);
        return this.httpSrv
            .getBlob('/reports/email', params);
    }

    setUserReport(form: string, report: string): Observable<{ count: number }> {
        return this.httpSrv.post('/reports', { form: form, report: report});
    }

    public currentCompany(): Observable<Company> {
        return this._company ? of(this._company) :
            this.httpSrv.get<Company>('/ccompany')
                .pipe(tap(res => this._company = res));
    }

    viewPDF(data: ReportViewData): Observable<any> {
        return this.httpSrv.putBlob('/reports/view', data);
    }
}
