import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { Balance } from '@ss/scheduled-sales/api-scheduled-sales';

@Injectable({ providedIn: 'root' })

export class CustomerBalanceService {
    constructor(private httpSv: HttpService) {}

    balance(id: number): Observable<Balance> {
        return this.httpSv.get(`/ssales/agents/${id}/balance`);
    }
}
