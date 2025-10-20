import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {REGIONS_URL, Wilaya, WILAYAS_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Lookup} from "./lookup.class";

@Injectable({
    providedIn: 'root'
})
export class RegionService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, REGIONS_URL);
    }
}
