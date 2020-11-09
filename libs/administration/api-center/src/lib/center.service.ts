import {Injectable} from '@angular/core';
import {Center, CENTER_URL} from './center-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {COMPANY_URL} from "@ss/administration/api-company";


@Injectable({
    providedIn: 'root'
})
export class CenterService extends BaseEntityService<Center> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CENTER_URL, COMPANY_URL);
    }

}
