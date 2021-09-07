import { Injectable } from '@angular/core';
import { Report } from './report';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { ReportViewComponent } from './report-view/report-view.component';
import { LanguageService } from '@ss/common/api-common';
import { HttpService } from '../../common/http.service';

@Injectable()
export class ReportService implements CanDeactivate<ReportViewComponent> {

    constructor(public http: HttpService,
        private trans: LanguageService) { }

    public get(url: string): Observable<Report[]> {
        return this.http.get<Report[]>(url);
    }

    postBlob(url: string, data?) {
        return this.http.postBlob(url, data);
    }

    canDeactivate(component: ReportViewComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (component.generating) {
            window.alert(this.trans.translate('PLZ_WAIT_REP'));
        }
        return !component.generating;
    }
}
