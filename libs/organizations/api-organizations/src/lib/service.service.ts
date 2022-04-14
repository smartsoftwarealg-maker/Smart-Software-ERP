import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { SERVICES_URL, Service } from './organizations-api';

@Injectable({
    providedIn: 'root'
})
export class ServiceService extends BaseEntityService<Service> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, SERVICES_URL[1], SERVICES_URL[0]);
    }

}
