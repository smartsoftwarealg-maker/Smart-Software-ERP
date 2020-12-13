import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Agent, AGENT_URL} from "./agent-api";


@Injectable({
    providedIn: 'root'
})
export class AgentService extends BaseEntityExtendedService<Agent> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, AGENT_URL);
    }

}
