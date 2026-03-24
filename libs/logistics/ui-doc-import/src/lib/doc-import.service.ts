import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {ImportInfo} from './import-info';
import {HttpParams} from '@angular/common/http';
import {Sort} from '@angular/material/sort';

@Injectable({
    providedIn: 'root'
})
export class DocImportService {
    private _sortColumn: string = null;

    constructor(private httpService: HttpService) { }

    getList(document: number,
        numb: number,
        agent: number,
        destination: number,
        reference: string,
        page: number,
        pageSize: number): Observable<{ body: ImportInfo[], itemCount: number }> {
        const params = new HttpParams()
            .set('document', document)
            .set('number', numb)
            .set('agent', agent||0)
            .set('destination', destination)
            .set('sort', this._sortColumn || 'number')
            .set('page', `${page}-${pageSize}`);
        const params1 = reference? params.set('reference', reference) : params;
        return this.httpService.getData('/imports', page, pageSize, this._sortColumn, null, params1);
    }

    importDoc(document: number, numb: number, destination: number, info?: boolean): Observable<number> {
        const data = {
            document:    document,
            number:      numb,
            destination: destination,
            info: info,
        };
        return this.httpService.put('/imports', data);
    }

    transferAll(id: number): Observable<number> {
        return this.httpService.post(`/production/mrp/transfer-all/${id}`);
    }

    set sortColumn(s: Sort) {
        this._sortColumn = (s.direction === 'desc' ? '-' : '') + s.active;
    }

    get sortColumn(): string {
        return this._sortColumn;
    }
}
