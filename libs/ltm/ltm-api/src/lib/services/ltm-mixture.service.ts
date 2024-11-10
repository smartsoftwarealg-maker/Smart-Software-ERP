import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { LTM_MIXTURE_URL, LTMMixture } from '../ltm-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class LtmMixtureService extends BaseEntityService<LTMMixture> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_MIXTURE_URL);
    }

}
