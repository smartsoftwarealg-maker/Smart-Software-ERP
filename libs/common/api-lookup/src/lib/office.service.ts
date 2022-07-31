import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { OFFICES_URL, Office } from './lookups-api';
import { BaseEntityService } from '@ss/common/api-base-entity';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OfficeService extends BaseEntityService<Office> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, OFFICES_URL);
    }

    search(location: number, building: number, floor: number): Observable<Office[]> {
        const params = new HttpParams()
            .set("location", location)
            .set("building", building)
            .set("floor", floor);
        return this.httpSrv.get<Office[]>(OFFICES_URL, params);
    }
}
