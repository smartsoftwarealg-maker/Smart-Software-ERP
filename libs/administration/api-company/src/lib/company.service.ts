import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Company, COMPANY_URL} from "./company-api";


@Injectable({
    providedIn: 'root'
})
export class CompanyService extends BaseEntityService<Company> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, COMPANY_URL);
    }

}
