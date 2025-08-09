import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { MISSIONS_URL } from '@ss/hr-missions';
import { Detail, JOURNEY_URL, MGeneration, MissionJourney, Summary } from './journey-api.class';
import {Lookup} from "@ss/common/api-lookup";

@Injectable({
    providedIn: 'root',
})
export class JourneyLineService extends BaseEntityService<MissionJourney> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, JOURNEY_URL, MISSIONS_URL);
    }

    getMissionElementTypes(id:number){
        return this.httpSrv.get<Lookup[]>('/missions/mission_elements_types')
    }

    generateMission(MG: MGeneration){
        return this.httpSrv.post('/missions/generation', MG)
    }
    getDetail() {
        return this.httpSrv.get<Detail[]>(`/missions/generation/${this.parentId}/detail`);
    }

    getSummary() {
        return this.httpSrv.get<Summary[]>(`/missions/generation/${this.parentId}/summary`);
    }
}
