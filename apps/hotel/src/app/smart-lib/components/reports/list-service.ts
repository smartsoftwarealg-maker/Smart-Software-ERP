import { Injectable } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../common/http.service';

@Injectable()
export class ListService {

    constructor(public _http: HttpService) {
    }

    getData(url: string, page: number, perPage: number, filter?: string): Observable<any[]> {
        let params = new HttpParams();
        params = params.set('page', (page - 1) + '-' + perPage);
        if (filter != null) {
            params = params.set('filter', filter);
        }
        return this._http.get<any[]>(url, params);
    }

    remove(url: string, id: number) {
        const urls = url + '/' + id;
        return this._http.remove(urls);
    }

    public getRecord(url, id: number, parentUrl?: number, parentId?: number) {
        const fUrl = parentId ? parentUrl + '/' + parentId + url + '/' + id : url + '/' + id;
        return this._http
            .get(fUrl, new HttpParams())
            .pipe(map(res => res ? res : {}));
    }
}
