import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Asset, ASSETS_URL, Depreciation} from './assets-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AssetsService extends BaseEntityService<Asset>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSETS_URL);
    }

    getDepreciation(id: number): Observable<Depreciation[][]> {
        const aid = id || 0;
        return this.httpSrv.get<Depreciation[][]>(`/assets/depreciations/${aid}`);
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
}
