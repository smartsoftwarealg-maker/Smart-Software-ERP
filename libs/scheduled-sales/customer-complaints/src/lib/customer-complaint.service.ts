import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { COMPLAINTS_URL, CustomerComplaint } from './customer-complaint.class';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CustomerComplaintsService extends BaseEntityService<CustomerComplaint> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, COMPLAINTS_URL);
    }
}
