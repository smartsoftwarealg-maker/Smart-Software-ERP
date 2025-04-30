import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { ClosedPeriod } from '@ss/accounting/accounting-api';

@Injectable({
    providedIn: 'root',
})
export class ClosedPeriodsService extends BaseEntityService<ClosedPeriod> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/accounting/periods');
    }

    list(){
        return this.httpSrv.get<ClosedPeriod[]>('/accounting/periods');
    }

    closeP(c : ClosedPeriod){
        return this.httpSrv.post('/accounting/periods', c);
    }

}
