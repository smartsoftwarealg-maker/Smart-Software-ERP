import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {City, CITY_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class CityService extends BaseEntityService<City> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CITY_URL);
    }
}
