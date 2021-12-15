import { Injectable } from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Dashboard} from './dashboard';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService extends BaseEntityExtendedService<Dashboard> {

  constructor(protected httpSrv: HttpService) {
      super(httpSrv, '/queries');
  }
}
