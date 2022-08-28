import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Quota, SS_QUOTA_URL} from './scheduled-sales-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class SSQuotaService extends BaseEntityService<Quota>{
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SS_QUOTA_URL);
    }
}
