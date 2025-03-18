import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { CustomerPoll} from '@ss/scheduled-sales/api-scheduled-sales';

@Injectable({
    providedIn: 'root',
})
export class CustomerPollService extends BaseEntityService<CustomerPoll> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/ssales/customer-poll');
    }
}
