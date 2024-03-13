import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { LTM_ANOMALIES_URL, LTM_MIXTURE_URL, LTMMixture } from "../ltm-api";
import {HttpService} from '@ss/common/api-common';
import { Lookup } from "@ss/common/api-lookup";

@Injectable({
  providedIn: 'root'
})
export class LtmAnomalyService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_ANOMALIES_URL);
    }
}
