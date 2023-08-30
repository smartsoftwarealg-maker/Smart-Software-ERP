import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { LOCATIONS, PersonLocation, PERSONS } from '../employee-api';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})

export class PersonLocationService extends BaseEntityService<PersonLocation> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LOCATIONS, PERSONS);
    }
}
