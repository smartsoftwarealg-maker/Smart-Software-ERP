import {Injectable} from '@angular/core';
import { Location, StockInfo } from "./article-api";
import {Observable} from 'rxjs';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import { HttpService, PaginationModel } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { Lot } from '@ss/common/api-lookup';


@Injectable({
    providedIn: 'root'
})
export class LocationService extends BaseEntityExtendedService<Location> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/store-locations');
    }

    getLots(
        reference: string,
        pageModel: PaginationModel,
        filter?: string,
        sortBy?: string) {
        const page = pageModel.page - 1;
        const pageSize = pageModel.pageSize;
        const prams = new HttpParams().append('find', reference);
        return this.httpSrv.getData<Location>(
            '/articles/stores',
            page,
            pageSize,
            filter,
            sortBy,
            prams,
        );
    }

}
