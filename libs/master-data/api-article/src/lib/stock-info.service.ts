import {Injectable} from '@angular/core';
import { Location, StockInfo } from "./article-api";
import {Observable} from 'rxjs';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class StockInfoService extends BaseEntityExtendedService<StockInfo> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/articles/stores');
    }

    find(search: string): Observable<{ itemCount: number, body: StockInfo[] }> {
        const params = new HttpParams().set('find', search);
        return super.getList(0, 50, search, null, params);
    }
}
