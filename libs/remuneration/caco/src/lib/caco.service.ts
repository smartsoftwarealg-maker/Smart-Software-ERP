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
             mode: number,
             kind: number,
             ssBase: string,
             absence: string,
             center?: string): Observable<CACO> {

      const params = new HttpParams()
          .set('year', year + '')
          .set('mode', mode === 1? 'r' : 'e')
          .set('kind', kind === 1? 'M' : 'h')
          .set('center', center)
          .set('absence', absence)
          .set('formula', ssBase)
          .set('fund', fund)
          .set('all', 'false');
      return this.httpSrv.get<CACO>(CACO_URL, params);
    }
}
