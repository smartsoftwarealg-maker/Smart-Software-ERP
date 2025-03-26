import { Injectable } from '@angular/core';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { Dashboard, Headers } from '../dashboard';
import { HttpService, PaginationModel } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Sort, SortDirection } from '@angular/material/sort';

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends BaseEntityExtendedService<Dashboard> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/queries', '/applications');
    }

    getHeaders(queryId: number): Observable<Headers> {
        return this.httpSrv.get<Headers>(`/dashboard/${queryId}/headers`);
    }

    getData(queryId: number,
        page: number,
        size: number,
        from?: string,
        to?: string,
        agent?: any,
        consolidated?: boolean,
        filter?: string): Observable<{ itemCount: number, body: any[][] }> {

        const orderBy = this.sortColumn? (this.sortColumn.startsWith('+')? this.sortColumn.substring(1) : this.sortColumn) : null;

        let params = new HttpParams();
        ([['from', from], ['to', to], ['agent', agent], ['consolidated', consolidated], ['filter', filter], ['order', orderBy]])
            .filter(v => v[1])
            .forEach(v => params = params.set(v[0], v[1]));
        return this.httpSrv.getData<any[]>(`/dashboard/${queryId}/data`, page, size, null, null, params);
    }

    getExcel(queryId: number,
        page: number,
        size: number,
        from?: string,
        to?: string,
        agent?: any,
        consolidated?: boolean): Observable<Blob> {
        let params = new HttpParams();
        ([['from', from], ['to', to], ['agent', agent], ['consolidated', consolidated]])
            .filter(v => v[1])
            .forEach(v => params = params.set(v[0], v[1]));
        return this.httpSrv.getBlob(`/dashboard/${queryId}/excel`, params);
    }

    getJson(queryId: number,
        page: number,
        size: number,
        from?: string,
        to?: string,
        agent?: any,
        consolidated?: boolean): Observable<Blob> {
        let params = new HttpParams();
        ([['from', from], ['to', to], ['agent', agent], ['consolidated', consolidated]])
            .filter(v => v[1])
            .forEach(v => params = params.set(v[0], v[1]));
        return this.httpSrv.getBlob(`/dashboard/${queryId}/json`, params);
    }

    getCenterPage(pageModel: PaginationModel, filter?: string): Observable<Dashboard[]> {
        return this.httpSrv.getData<Dashboard>(`/dashboard/${this.getParentId()}/center-queries`, pageModel.page - 1, pageModel.pageSize, filter, this.sortColumn)
            .pipe(
                map(data => {
                    pageModel.elementCount = data.itemCount;
                    return data.body;
                })
            );
    }
}
