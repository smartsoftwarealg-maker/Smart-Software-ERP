import {Injectable} from '@angular/core';
import {CENTER_URL, Company, COMPANY_URL} from './center-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';

export const DEFAULT_APP_CODE = 1;

@Injectable({
    providedIn: 'root'
})
export class CompanyService extends BaseEntityService<Company> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, COMPANY_URL);
    }

}
