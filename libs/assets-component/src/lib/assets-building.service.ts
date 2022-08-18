import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Asset, AssetBuilding, ASSETS_BUILDING_URL, ASSETS_URL, Depreciation} from './assets-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Lookup} from '@ss/common/api-lookup';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AssetsBuildingService extends BaseEntityService<AssetBuilding> {
    private _buildings = new Set<number>();

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSETS_BUILDING_URL);
    }

    override getList(page: number,
                     pageSize: number,
                     filter?: string,
                     sortBy?: string,
                     extraPrams?: HttpParams): Observable<{ itemCount: number; body: AssetBuilding[] }> {
        return super.getList(page, pageSize, filter, sortBy, extraPrams)
            .pipe(map(res => {
                return  { itemCount: res.itemCount,
                          body: this._buildings.size == 0?
                              res.body :
                              res.body.filter(b => this._buildings.has(b.id)) };
            } ));
    }

    set buildings(b: Lookup[]) {
        this._buildings.clear();
        console.log('buildings', b);
        b.forEach(l => this._buildings.add(l.id));
    }
}
