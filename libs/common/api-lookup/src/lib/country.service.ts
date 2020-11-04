import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Country, COUNTRY_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class CountryService extends BaseEntityService<Country> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, COUNTRY_URL);
    }

}
