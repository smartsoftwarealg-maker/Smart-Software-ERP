import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Office, OFFICES_URL } from './organizations-api';

@Injectable({
    providedIn: 'root'
})
export class OfficeService extends BaseEntityService<Office> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, OFFICES_URL[0], OFFICES_URL[1]);
    }

}
