import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { FAULTS, PersonFault, PERSONS } from '../employee-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class PersonFaultService extends BaseEntityService<PersonFault>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, FAULTS, PERSONS);
    }
}
