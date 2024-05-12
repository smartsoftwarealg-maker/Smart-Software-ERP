import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { Balance, Turnover } from '@ss/scheduled-sales/api-scheduled-sales';

@Injectable({ providedIn: 'root' })

export class TurnoverService {
    constructor(private httpSv: HttpService) {}

    monthlyTurnover(id: number): Observable<Turnover[]> {
        return this.httpSv.get(`/ssales/agents/${id}/monthly-turnover`);
    }

    annualTurnover(id: number): Observable<Turnover[]> {
        return this.httpSv.get(`/ssales/agents/${id}/annual-turnover`);
    }
}
