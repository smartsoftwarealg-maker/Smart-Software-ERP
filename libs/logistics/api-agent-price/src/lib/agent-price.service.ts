import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from "@ss/common/api-common";
import {AGENT_PRICES_URL, AgentPrice} from "./agent-price-api";

@Injectable({
    providedIn: 'root'
})
export class AgentPriceService extends BaseEntityService<AgentPrice>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, AGENT_PRICES_URL);
    }

}
