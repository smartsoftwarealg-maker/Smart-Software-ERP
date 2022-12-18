import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { DIVISIONS_URL, Division } from './lookups-api';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class DivisionService extends BaseEntityService<Division> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DIVISIONS_URL);
    }

}
