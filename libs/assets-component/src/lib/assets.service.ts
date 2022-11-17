import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Asset, ASSETS_URL, Depreciation, SearchCriteria} from './assets-api';
import {HttpService, LanguageService, PaginationModel} from '@ss/common/api-common';
import {Observable, retry} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {LanguagesService} from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class AssetsService extends BaseEntityService<Asset> {

    constructor(protected override httpSrv: HttpService, private langSrv: LanguageService) {
        super(httpSrv, ASSETS_URL);
    }

    getDepreciation(id: number): Observable<Depreciation[][]> {
        const aid = id || 0;
        return this.httpSrv
            .get<Depreciation[][]>(`/assets/depreciations/${aid}`)
            .pipe(retry({ count: 5, delay: 3000 }));
    }

    getMaxReference(): Observable<{reference: string}> {
        return this.httpSrv.get<{reference: string}> ('/assets/max-reference');
    }

    getAQSMaxReference(klass: number): Observable<{reference: string}> {
        const params = new HttpParams().set('class', klass);
        return this.httpSrv.get<{reference: string}> ('/assets/max-reference', params);
    }

    getMaxReception(): Observable<{reception: string}> {
        return this.httpSrv.get<{reception: string}> ('/assets/max-reception');
    }

    soldOut(page: number, filter: string): Observable<{ itemCount: number, body: Asset[] }> {
        return this.httpSrv.getData<Asset>('/assets/soldout', page, 5, filter);
    }

    private format(key: string, value: string) {
        return (key.indexOf('Date') > 0) ? this.langSrv.formatDate(value) : value;
    }

    public search(pageModel: PaginationModel, criteria: SearchCriteria): Observable<{ itemCount: number, body: Asset[] }> {
        const params = Object.entries(criteria)
            .filter(([key, value]) => value && value !== '' && value !== 0)
            .reduce((a, b) => a.set(b[0], this.format(b[0], b[1])), new HttpParams());

        return  this.httpSrv
            .getData<Asset>('/assets/search', pageModel.page - 1, pageModel.pageSize, null, null, params);
    }

    public getExcel(criteria: SearchCriteria): Observable<Blob> {
        const params = Object.entries(criteria)
            .filter(([key, value]) => value && value !== '' && value !== 0)
            .reduce((a, b) => a.set(b[0], this.format(b[0], b[1])), new HttpParams());

        return  this.httpSrv
            .getBlob('/assets/search-excel', params);
    }

    upload(data: FormData): Observable<any> {
        return this.httpSrv.upload('/assets/injection', data);
    }

    duplicate(assetId: number, count: number): Observable<any> {
        const data = { id: assetId, count: count };
        return this.httpSrv.post('/assets/duplicate', data);
    }


}
