import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {VACATION_PLANNING_URL, VacationPlanning, VacationPlanningDetail} from './vacation-planning-api';
import {HttpService, PaginationModel} from '@ss/common/api-common';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationPlanningDetailService extends BaseEntityService<VacationPlanningDetail> {
    constructor(protected httpSrv: HttpService) {
        super(httpSrv, '/detail', '/payroll/vacations');
    }
}
