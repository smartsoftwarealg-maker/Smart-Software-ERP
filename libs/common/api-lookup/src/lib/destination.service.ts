import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { DESTINATIONS_URL } from './lookups-api';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Lookup } from './lookup.class';

@Injectable({
    providedIn: 'root'
})
export class DestinationService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DESTINATIONS_URL);
    }

}
