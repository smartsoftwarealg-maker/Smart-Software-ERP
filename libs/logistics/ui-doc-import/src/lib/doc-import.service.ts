import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {ImportInfo} from './import-info';
import {HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DocImportService {

    constructor(private httpService: HttpService) { }

    getList(document: number, numb: number, agent: number, page: number, pageSize: number): Observable<{ body: ImportInfo[], itemCount: number }> {
        const params = new HttpParams()
            .set('document', document)
            .set('number', numb)
            .set('agent', agent||0)
            .set('page', `${page}-${pageSize}`);
        return this.httpService.getData('/imports', page, pageSize, null, null, params);
    }

    importDoc(document: number, numb: number, destination: number): Observable<number> {
        const data = {
            document:    document,
            number:      numb,
            destination: destination
        };
        return this.httpService.put('/imports', data);
    }
}
