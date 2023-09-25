import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { OFFICES_URL, Office, BUILDINGS_URL, FLOORS_URL, BUILDINGS, OFFICES } from './lookups-api';
import { BaseEntityService } from '@ss/common/api-base-entity';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lookup} from './lookup.class';

@Injectable({
    providedIn: 'root'
})
export class OfficeService extends BaseEntityService<Office> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, OFFICES, BUILDINGS);
        this.setParentId(0);
    }

    search(location: number, building: number, floor: number): Observable<Office[]> {
        const params = new HttpParams()
            .set('location', location)
            .set('building', building)
            .set('floor', floor);
        return this.httpSrv.get<Office[]>(OFFICES_URL, params);
    }

    buildings(location: number): Observable<Lookup[]>{
        return this.httpSrv.get<Lookup[]>(`/locations/${location}/buildings?page=0-50`);
        // const params = new HttpParams().set('location', location + '');
        // return this.httpSrv
        //     .get<Lookup[]>(BUILDINGS_URL, params);
    }

    floors(location: number, building: number): Observable<Lookup[]>{
        const params = new HttpParams()
            .set('location', location + '')
            .set('building', building + '');
        return this.httpSrv
            .get<Lookup[]>(FLOORS_URL, params);
    }
}
