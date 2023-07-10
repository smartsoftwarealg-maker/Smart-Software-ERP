import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {AssetBuilding, ASSETS_BUILDING_URL} from './assets-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class AssetsBuildingService extends BaseEntityService<AssetBuilding> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSETS_BUILDING_URL);
    }

    // override getList(page: number,
    //                  pageSize: number,
    //                  filter?: string,
    //                  sortBy?: string,
    //                  extraPrams?: HttpParams): Observable<{ itemCount: number; body: AssetBuilding[] }> {
    //     return super.getList(page, pageSize, filter, sortBy, extraPrams)
    //         .pipe(map(res => {
    //             return {
    //                 itemCount: res.itemCount,
    //                 body: res.body.filter(b => this.location < 1 || b.locationId === this._locationId)
    //             }
    //         } ));
    // }
    //
    // set location(l: number) {
    //     this._locationId = l;
    // }
}
