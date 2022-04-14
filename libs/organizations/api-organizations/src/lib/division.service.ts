import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { DIVISIONS_URL, Division } from './organizations-api';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class DivisionService extends BaseEntityService<Division> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, DIVISIONS_URL);
    }

}
