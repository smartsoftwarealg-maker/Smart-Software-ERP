import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Wilaya, WILAYAS_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class WilayaService extends BaseEntityService<Wilaya> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, WILAYAS_URL);
    }

    getByIDs(list: number[]): Observable<Wilaya[]> {
        const params = new HttpParams().set('ids', list.join(','));
        return this.httpSrv.get<Wilaya[]>(WILAYAS_URL, params);
    }
}
