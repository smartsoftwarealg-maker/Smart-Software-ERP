import { Injectable } from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Dashboard, Headers} from './dashboard';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseEntityExtendedService<Dashboard> {

  constructor(protected httpSrv: HttpService) {
      super(httpSrv, '/queries', '/applications');
  }

  getHeaders(queryId: number): Observable<Headers> {
      return this.httpSrv.get<Headers>(`/dashboard/${queryId}/headers`);
  }

  getData(queryId: number,
          page: number,
          size: number,
          from?: string,
          to?: string,
          agent?: any,
          consolidated?: boolean): Observable<{ itemCount: number, body: any[][] }> {
      let params = new HttpParams();
      ([['from', from], ['to', to], ['agent', agent], ['consolidated', consolidated]])
          .filter(v => v[1])
          .forEach(v => params = params.set(v[0], v[1]));
      return this.httpSrv.getData<any[]>(`/dashboard/${queryId}/data`, page, size, null, null, params);
  }
}
