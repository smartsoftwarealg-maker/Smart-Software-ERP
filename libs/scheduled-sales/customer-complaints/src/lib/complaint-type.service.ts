import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { COMPLAINTS_TYPE_URL } from './customer-complaint.class';
import { HttpService } from '@ss/common/api-common';
import { Lookup } from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class ComplaintTypeService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, COMPLAINTS_TYPE_URL);
    }
}
