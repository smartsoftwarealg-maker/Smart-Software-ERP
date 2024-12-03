import { inject, Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    PAID_LEAVE_URL,
    VACATION_PLANNING_URL,
    VacationPlanning,
    VFormula,
    VHistory,
    VUpdate
} from './vacation-planning-api';
import {HttpService, PaginationModel} from '@ss/common/api-common';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeavePlanningCalculatorService {
    #httpSrv = inject(HttpService);

    history(id: number, year: number, ssFormula: string, irgFormula: string): Observable<VHistory[]> {
        const params = new HttpParams()
            .set('year', year.toString())
            .set('ssFormula', ssFormula)
            .set('irgFormula', irgFormula);
        return this.#httpSrv.get<VHistory[]>(`${PAID_LEAVE_URL}/history`, params);
    }

    update(data: VUpdate): Observable<{ count: number }> {
        return this.#httpSrv.put(`${PAID_LEAVE_URL}/update`, data) as Observable<{ count: number }>;
    }

    formulas(): Observable<VFormula[]> {
        return this.#httpSrv.get<VFormula[]>(`${PAID_LEAVE_URL}/formulas`);
    }
}
