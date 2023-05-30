import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { AGENT_URL, AgentCenter, CENTER_URL } from './agent-api';

@Injectable({
    providedIn: 'root'
})
export class AgentCenterService extends BaseEntityExtendedService<AgentCenter> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CENTER_URL, AGENT_URL);
    }
}
