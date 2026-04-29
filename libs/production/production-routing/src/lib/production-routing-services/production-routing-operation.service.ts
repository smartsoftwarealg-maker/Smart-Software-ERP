import { Injectable, inject } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import {
    PRODUCTION_ROUTING_URL,
    Routing,
    ROUTING_OPERATION_URL,
    RoutingOperation,
} from './production-routing-api';

@Injectable({
    providedIn: 'root',
})
export class ProductionRoutingOperationService extends BaseEntityService<RoutingOperation> {
    protected override httpSrv = inject(HttpService);

    constructor() {
        super(
            inject(HttpService),
            ROUTING_OPERATION_URL,
            PRODUCTION_ROUTING_URL,
        );
    }
}
