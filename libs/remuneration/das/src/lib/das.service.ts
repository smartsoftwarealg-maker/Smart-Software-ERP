import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {DAS, DAS_URL} from './das-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DasService {
  constructor(private httpSrv: HttpService) {}

    generate(year: number,
             fund: number,
             mode: number,
             kind: number,
             ssBase: string,
             absence: string,
             center?: string): Observable<DAS> {

      const params = new HttpParams()
          .set('year', year + '')
          .set('mode', mode === 1? 'r' : 'e')
          .set('kind', kind === 1? 'M' : 'h')
          .set('center', center)
          .set('absence', absence)
          .set('formula', ssBase)
          .set('fund', fund)
          .set('all', 'false');
      return this.httpSrv.get<DAS>(DAS_URL, params);
    }
}
