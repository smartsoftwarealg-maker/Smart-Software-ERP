import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    LTM_ANOMALIES_URL,
    LTM_MIXTURE_URL,
    LTM_TESTING_ANOMALIES_URL,
    LTMMixture,
    LTMTestingAnomaly
} from "../ltm-api";
import {HttpService} from '@ss/common/api-common';
import { Lookup } from "@ss/common/api-lookup";

@Injectable({
  providedIn: 'root'
})
export class LtmTestingAnomalyService extends BaseEntityService<LTMTestingAnomaly> {
    #_from = new Date();
    #_to   = new Date();

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_TESTING_ANOMALIES_URL);
    }

    get from() {
        return this.#_from;
    }

    get to() {
        return this.#_to;
    }

    set from(d: Date) {
        this.#_from = d || this.#_from;
    }

    set to(d: Date) {
        this.#_to = d || this.#_to;
    }
}
