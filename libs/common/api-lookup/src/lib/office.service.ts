import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {OFFICES_URL, Office, BUILDINGS_URL, FLOORS_URL} from './lookups-api';
import { BaseEntityService } from '@ss/common/api-base-entity';
import {HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Lookup} from './lookup.class';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OfficeService extends BaseEntityService<Office> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, OFFICES_URL);
    }

    search(location: number, building: number, floor: number): Observable<Office[]> {
        const params = new HttpParams()
            .set("location", location)
            .set("building", building)
            .set("floor", floor);
        return this.httpSrv.get<Office[]>(OFFICES_URL, params);
    }

    buildings(location: number): Observable<Lookup[]>{
        const params = new HttpParams().set('location', location + '');
        return this.httpSrv
            .get<Lookup[]>(BUILDINGS_URL, params);
    }

    floors(location: number, building: number): Observable<Lookup[]>{
        const params = new HttpParams()
            .set('location', location + '')
            .set('building', building + '');
        return this.httpSrv
            .get<Lookup[]>(FLOORS_URL, params);
    }

}
