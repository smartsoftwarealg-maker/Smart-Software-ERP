import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportCatalog } from '../report-catalog';
import { of } from 'rxjs';
import { ReportList } from '../ReportList';
import { HttpService } from '../../../../smart-lib/common/http.service';

@Injectable()
export class ReportCatalogService {
    filter = '';
    sortDirection = null;

    constructor(public http: HttpService) {
    }

    load(page: number, size: number): Observable<{body: ReportCatalog[], itemCount: number}> {
        const strFilter = this.filter ? `&filter=${this.filter}` : '';
        const sort = this.sortDirection ? `&sort=${this.sortDirection}` : '';
        const page0 = Math.max(0, page - 1);
        return this.http
            .getData('/reports/catalog', page0, size, this.filter, this.sortDirection);
    }

    getCatalogById(id: number): Observable<ReportCatalog> {
        return id ?
            this.http.get<ReportCatalog>(`/reports/catalog/${id}`) :
            of({ id: 0 });
    }

    deleteById(id: number): Observable<any> {
        return this.http.remove(`/reports/catalog/${id}`);
    }

    save(catalog: ReportCatalog): Observable<number> {
        return catalog.id ?
            this.http.put('/reports/catalog', catalog) :
            this.http.post('/reports/catalog', catalog);
    }

    loadByApp(appName: string): Observable<ReportList[]> {
        return this.http.get<ReportList[]>(`/reports/list?filter=${appName}`);
    }


    getReports(reportList: ReportList[], appName: string): string[] {
        const v = reportList
            .filter(f => f.files && f.files.length > 0)
            .map(f => this.accReports(reportList, f.name, appName));
        return v.reduce((acc, e) => acc.concat(e), []);
    }
    private accReports(reportList: ReportList[], baseDir: string, appName: string): string[] {
        const v: Array<Array<string>> =
            reportList
                .filter(r => r.name === baseDir && r.files && r.files.length > 0)
                .map(e => e.files.map(f => './reports/' + appName + '/' + (e.name === '.' ? '' : e.name + '/') + f));
        const v2 = v.reduce((acc, e) => acc.concat(e), []);
        return v2;
    }
}
