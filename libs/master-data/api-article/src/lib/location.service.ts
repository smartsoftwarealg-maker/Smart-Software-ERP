import {Injectable} from '@angular/core';
import { Location } from './article-api';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import { HttpService, PaginationModel } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


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
        store?: number,
        stock?: number,
        mark?: number,
        sortBy?: string): Observable<{ itemCount: number; body: Location[] }> {
        const page = pageModel.page - 1;
        const pageSize = pageModel.pageSize;
        const map: {key: string, value: string|number}[] = [
            { key: 'store', value: store },
            { key: 'stock', value: stock },
            { key: 'mark', value: mark },
            { key: 'find', value: reference },

        ];
        const params = map.reduce((p, c) => {
            if (c.value !== undefined && c.value !== null) {
                return p.set(c.key, c.value.toString());
            }
            return p;
        }, new HttpParams());
        return this.httpSrv.getData<Location>(
            '/articles/stores',
            page,
            pageSize,
            filter,
            this.sortColumn,
            params,
        );
    }
}
