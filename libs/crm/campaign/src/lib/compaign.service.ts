import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import {Campaign, TMessage} from './campaign.api';

export const CAMPAIGN_URL = '/crm/campaigns';

@Injectable({
    providedIn: 'root',
})
export class CompaignService extends BaseEntityService<Campaign> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CAMPAIGN_URL);
    }

    send(tMessage: TMessage){
        return  this.httpSrv.post(CAMPAIGN_URL+'/send', tMessage);
    }
}
