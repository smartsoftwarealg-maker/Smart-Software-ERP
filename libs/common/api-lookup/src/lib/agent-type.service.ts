import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {AGENT_TYPE_URL, AgentType} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class AgentTypeService extends BaseEntityService<AgentType> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, AGENT_TYPE_URL);
    }

}
