import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {EMPLOYMENT_TYPE_URL, EmploymentType} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class EmploymentTypeService extends BaseEntityService<EmploymentType> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, EMPLOYMENT_TYPE_URL);
    }

}
