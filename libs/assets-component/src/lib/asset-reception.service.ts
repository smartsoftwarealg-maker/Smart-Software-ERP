import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Asset, ASSET_RECEPTIONS_URL, AssetReception} from './assets-api';
import {HttpService} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AssetReceptionService extends BaseEntityService<AssetReception> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSET_RECEPTIONS_URL);
    }

    getAssets(id: number): Observable<Asset[]> {
        const params = new HttpParams().set('id', '' + id);
        return this.httpSrv.get<Asset[]>('/assets/find', params);
    }
}
