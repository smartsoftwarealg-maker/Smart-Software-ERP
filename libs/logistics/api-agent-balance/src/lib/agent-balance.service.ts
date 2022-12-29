import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {AgentBalance, BALANCE_URL} from "./agent-balance";
import {AGENT_URL} from "@ss/logistics/api-agent";


@Injectable({
    providedIn: 'root'
})
export class AgentBalanceService extends BaseEntityService<AgentBalance> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, BALANCE_URL, AGENT_URL);
    }

}
