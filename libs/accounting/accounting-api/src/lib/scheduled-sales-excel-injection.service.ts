import { inject, Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduledSalesExcelInjectionService  {
    #httpSrv: HttpService = inject(HttpService);

  upload(data: FormData): Observable<{ count: number }> {
      return this.#httpSrv.upload('/accounting/sales-injection', data);
  }
  inject(data: FormData): Observable<{ count: number }> {
      return this.#httpSrv.upload('/accounting/excel-injection', data);
  }

 }
