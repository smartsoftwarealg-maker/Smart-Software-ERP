import {Injectable} from '@angular/core';
import {LanguageService} from '@ss/common/api-common';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';
import {DefaultReportComponent} from './ui-default-report/default-report.component';
import {HttpParams} from '@angular/common/http';
import {Company, HttpService} from '@ss/common/api-common';
import {EmailSenderComponent} from './ui-email-sender/email-sender.component';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class DefaultReportService {
    private _company: Company = null;
    constructor(private langSrv: LanguageService,
                private matDialog: MatDialog,
                private httpSrv: HttpService) {}

    public open(app: string, form: string): Observable<any> {
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

}
