import { BaseEntityService } from '@ss/common/api-base-entity';
import { POption } from '@ss/payroll-common';
import { HttpService } from '@ss/common/api-common';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PayrollOptionsService extends BaseEntityService<POption>{
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/payroll/options');
    }
}
