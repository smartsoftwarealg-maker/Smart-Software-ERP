import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {EMPLOYEE_TRAINING_URL, Training} from './employee-training';
import {HttpService} from '@ss/common/api-common';
import {PERSON_URL} from '../employee-diplomas/employee-diploma-api';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTrainingService extends  BaseEntityService<Training> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv,  EMPLOYEE_TRAINING_URL, PERSON_URL);
    }
}
