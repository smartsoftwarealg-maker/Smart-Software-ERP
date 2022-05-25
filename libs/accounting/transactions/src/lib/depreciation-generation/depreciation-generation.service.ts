import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {DEPRECIATION_URL, DepreciationRow, GenerationInfo} from './depreciation-row';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepreciationGenerationService extends BaseEntityService<DepreciationRow>{

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, DEPRECIATION_URL);
  }

  getDepreciation(info: GenerationInfo): Observable<DepreciationRow[]> {
      const {year, from, to, byCC, dType } = info;
      const params = new HttpParams()
          .set('cc', byCC + '')
          .set('year', year + '')
          .set('from', from + '')
          .set('dType', dType + '')
          .set('to', to + '');
      return this.httpSrv.get<DepreciationRow[]>(DEPRECIATION_URL, params);
  }
}
