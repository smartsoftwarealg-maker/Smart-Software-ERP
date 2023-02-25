import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {NATIONALITIES_URL, Nationality} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class NationalityService extends BaseEntityService<Nationality> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, NATIONALITIES_URL);
    }

}
