import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Injectable } from '@angular/core';
import {
    AGENT_URL,
    TRANSPORT_CONVENTIONS_URL,
    TransportConvention,
} from './transport-convention.api';

@Injectable({
    providedIn: 'root',
})
export class TransportConventionService extends BaseEntityExtendedService<TransportConvention> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TRANSPORT_CONVENTIONS_URL, AGENT_URL);
    }
}
