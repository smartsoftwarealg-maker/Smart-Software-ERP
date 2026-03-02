import { Injectable } from '@angular/core';
import { DepositDate } from './deposit-date';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';


@Injectable(
    {
        providedIn: 'root'
    }

)
export class DepositDateService extends BaseEntityService<DepositDate> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/payroll/deposit-date');
    }
}
