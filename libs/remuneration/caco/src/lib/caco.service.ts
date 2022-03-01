import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {CACO, CACO_URL} from './caco-api';

@Injectable({
  providedIn: 'root'
})
export class CacoService {
  constructor(private httpSrv: HttpService) {}

    generate(year: number,
             fund: number,
             leaveBase: string,
             ssBase: string,
             contribution: string,
             absence: string): Observable<string[]> {

      const params = new HttpParams()
          .set('fund', fund)
          .set('year', year + '')
          .set('base', leaveBase)
          .set('ss', ssBase)
          .set('absence', absence)
          .set('contribution', contribution);

      return this.httpSrv.get<string[]>(CACO_URL, params);
    }
}
