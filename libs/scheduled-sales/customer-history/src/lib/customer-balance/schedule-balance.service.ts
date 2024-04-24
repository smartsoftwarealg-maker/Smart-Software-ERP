import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { ScheduleBalance } from '@ss/scheduled-sales/api-scheduled-sales';

@Injectable({ providedIn: 'root' })

export class ScheduleBalanceService {
    constructor(private httpSv: HttpService) {}

    balance(id: number): Observable<ScheduleBalance> {
        return this.httpSv.get(`/ssales/agents/${id}/schedule-balance`);
    }
}
