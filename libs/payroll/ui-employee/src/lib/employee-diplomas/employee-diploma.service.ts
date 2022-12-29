import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {EMPLOYEE_DIPLOMA_URL, EmployeeDiploma, PERSON_URL} from './employee-diploma-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDiplomaService extends BaseEntityService<EmployeeDiploma>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,  EMPLOYEE_DIPLOMA_URL, PERSON_URL);
    }
}
