import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelInjectionService extends BaseEntityService<any> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, '/payroll/xls-injection');
  }

  upload(data: FormData): Observable<any> {
      return this.httpSrv.upload('/payroll/injection', data);
  }

 }
