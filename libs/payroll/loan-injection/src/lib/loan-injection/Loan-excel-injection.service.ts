import { inject, Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoanExcelInjectionService {
    #httpSrv: HttpService = inject(HttpService);

    upload(data: FormData): Observable<{ count: number }> {
        return this.#httpSrv.upload('/payroll/loan-injection', data);
    }

    inject(data: FormData): Observable<{ count: number }> {
        return this.#httpSrv.upload('/payroll/loan-injection', data);
    }
}
