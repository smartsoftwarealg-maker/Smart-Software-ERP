import { Injectable } from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import { Dashboard, DashboardCenter, Headers } from '../dashboard';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardCenterService extends BaseEntityExtendedService<DashboardCenter> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, '/centers', '/dashboards');
  }
}
