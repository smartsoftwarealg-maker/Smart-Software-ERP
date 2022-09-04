import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {SalesMode, SS_MODE_URL} from './scheduled-sales-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class SalesModeService extends BaseEntityService<SalesMode>{
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SS_MODE_URL);
    }
}
