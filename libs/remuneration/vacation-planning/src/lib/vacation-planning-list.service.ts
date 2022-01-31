import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {VACATION_PLANNING_URL, VacationPlanning} from './vacation-planning-api';
import {HttpService, PaginationModel} from '@ss/common/api-common';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationPlanningListService extends BaseEntityService<VacationPlanning> {
    private year_ = 0;

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, VACATION_PLANNING_URL);
    }

    set year(value: number) {
        this.year_ = value;
    }

    getPage(pageModel: PaginationModel, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<VacationPlanning[]> {
        const params = extraPrams? extraPrams : new HttpParams();
        return super.getPage(pageModel, filter, sortBy, params.set('period', this.year_));
    }
}
