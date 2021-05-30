import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {REPORTS_LIST_URL} from './report-api';
import {HttpParams} from '@angular/common/http';
import {ReportCatalog} from '@ss/common/api-report-param';


@Injectable({
    providedIn: 'root'
})
export class ReportListService {

    constructor(protected httpSrv: HttpService) {
    }

    getListByApp(app: string): Observable<string[]> {
        return this.httpSrv.get<string[]>(REPORTS_LIST_URL, new HttpParams().set('base', app));
    }

    getCatalogByApp(app: string): Observable<ReportCatalog[]> {
        const params = new HttpParams()
            .set('base', app)
            .set('page', '0-50');
        return this.httpSrv.get<ReportCatalog[]>('/reports/catalog', params);
    }
}
