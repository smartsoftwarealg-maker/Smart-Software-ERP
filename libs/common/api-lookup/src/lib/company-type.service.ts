import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {COMPANY_TYPE_URL, CompanyType} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class CompanyTypeService extends BaseEntityService<CompanyType> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, COMPANY_TYPE_URL);
    }

}
