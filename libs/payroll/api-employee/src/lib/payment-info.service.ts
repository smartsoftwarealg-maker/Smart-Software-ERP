import { Injectable } from '@angular/core';
import {PaymentInfo} from './employee-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentInfoService {

  constructor(public httpSrv: HttpService) {
  }

  load(empId: number): Observable<PaymentInfo> {
      return this.httpSrv.get<PaymentInfo>(`/payroll/${empId || 0}/payment-info`);
  }

  update(paymentInfo: PaymentInfo): Observable<any> {
      return this.httpSrv.put(`/payroll/payment-info`, paymentInfo);
  }
}
