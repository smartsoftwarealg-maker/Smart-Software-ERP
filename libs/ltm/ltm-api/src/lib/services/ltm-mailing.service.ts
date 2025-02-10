import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { LTM_MAILING_URL, LTMMailingList } from '../ltm-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class LtmMailingService extends BaseEntityService<LTMMailingList> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_MAILING_URL);
    }
}
