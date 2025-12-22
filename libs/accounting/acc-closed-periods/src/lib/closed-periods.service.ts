import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { ClosedPeriod } from '@ss/accounting/accounting-api';

@Injectable({
    providedIn: 'root',
})
export class ClosedPeriodsService extends BaseEntityService<ClosedPeriod> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/accounting/acc-periods');
    }

    list(){
        return this.httpSrv.get<ClosedPeriod[]>('/accounting/acc-periods');
    }

    closePeriod(c : ClosedPeriod){
        return this.httpSrv.post('/accounting/acc-periods', c);
    }

}
