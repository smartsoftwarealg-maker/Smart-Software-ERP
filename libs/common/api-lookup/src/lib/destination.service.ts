import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Destination, DESTINATIONS_URL } from './lookups-api';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class DestinationService extends BaseEntityService<Destination> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DESTINATIONS_URL);
    }

}
