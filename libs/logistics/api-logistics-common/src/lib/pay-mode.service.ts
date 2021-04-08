import { Injectable } from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {PayMode} from '@ss/common/api-lookup';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})

export class PayModeService extends BaseEntityExtendedService<PayMode> {

  constructor(protected httpSrv: HttpService) {
      super(httpSrv, '/paymodes');
  }
}
