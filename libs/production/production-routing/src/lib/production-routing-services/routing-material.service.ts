import { Injectable, inject } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import {
    PRODUCTION_OPERATION_URL,
    ROUTING_MATERIAL_URL,
    ROUTING_OPERATION_URL,
    RoutingMaterial,
} from './production-routing-api';

@Injectable({
    providedIn: 'root',
})
export class RoutingMaterialService extends BaseEntityService<RoutingMaterial> {
    protected override httpSrv = inject(HttpService);

    constructor() {
        super(
            inject(HttpService),
            ROUTING_MATERIAL_URL,
            PRODUCTION_OPERATION_URL,
        );
    }
}
