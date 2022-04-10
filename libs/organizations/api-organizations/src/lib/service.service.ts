import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { SERVICES_URL, Service } from './lookups-api';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class ServiceService extends BaseEntityService<Service> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, SERVICES_URL);
    }

}
