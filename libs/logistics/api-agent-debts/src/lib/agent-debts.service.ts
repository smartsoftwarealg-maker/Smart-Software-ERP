import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {AgentDebts, DEBTS_URL} from "./agent-debts";
import {AGENT_URL} from "@ss/logistics/api-agent";


@Injectable({
    providedIn: 'root'
})
export class AgentDebtsService extends BaseEntityService<AgentDebts> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, DEBTS_URL, AGENT_URL);
    }

}
