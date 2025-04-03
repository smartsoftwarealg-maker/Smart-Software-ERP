import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { Fund } from './fund.api';

@Injectable({
  providedIn: 'root'
})
export class FundService extends BaseEntityService<Fund>{
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/payroll/funds');
    }
}
