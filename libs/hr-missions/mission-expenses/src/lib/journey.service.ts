import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { MISSIONS_URL } from '@ss/hr-missions';
import { JOURNEY_URL, MissionJourney } from './journey-api.class';

@Injectable({
    providedIn: 'root',
})
export class JourneyLineService extends BaseEntityService<MissionJourney> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, JOURNEY_URL, MISSIONS_URL);
    }
}
