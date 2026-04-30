import { Injectable, inject } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { PRODUCTION_ROUTING_URL, Routing } from './production-routing-api';

@Injectable({
    providedIn: 'root',
})
export class ProductionRoutingService extends BaseEntityService<Routing> {
    protected override httpSrv = inject(HttpService);

    constructor() {
        super(inject(HttpService), PRODUCTION_ROUTING_URL);
    }
}
