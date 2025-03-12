import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { SalesPoll } from '@ss/scheduled-sales/api-scheduled-sales';

@Injectable({
    providedIn: 'root'
})
export class SalesPollService extends BaseEntityService<SalesPoll> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/ssales/polls');
    }
}
