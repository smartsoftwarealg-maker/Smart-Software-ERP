import {Injectable} from '@angular/core';
import {Center, CENTER_URL, COMPANY_URL} from './center-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';


@Injectable({
    providedIn: 'root'
})
export class CenterService extends BaseEntityService<Center> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CENTER_URL, COMPANY_URL);
    }

}
