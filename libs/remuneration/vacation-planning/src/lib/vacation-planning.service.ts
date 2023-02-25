import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {VACATION_PLANNING_URL, VacationPlanning} from './vacation-planning-api';
import {HttpService, PaginationModel} from '@ss/common/api-common';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationPlanningService extends BaseEntityService<VacationPlanning> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, VACATION_PLANNING_URL, '/payroll/years');
        this.parentId = new Date().getFullYear() - 1;
    }

    set year(value: number) {
        this.parentId = value;
    }

    override getPage(pageModel: PaginationModel, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<VacationPlanning[]> {
        return super.getPage(pageModel, filter, sortBy);
    }

    updatePlanning(year: number, base: number): Observable<{count: number}> {
        return this.httpSrv.put(`/payroll/years/${year}?base=${base}`);
    }
}
