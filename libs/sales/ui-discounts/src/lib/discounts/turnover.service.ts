import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { DGeneration, Turnover } from './turnover-api.class';
import { HttpParams } from '@angular/common/http';


export const TURNOVER_URL = '/discounts/turnover';
export const GENERATE_URL = '/discounts/generate';


@Injectable({
    providedIn: 'root'
})
export class TurnoverService extends BaseEntityService<Turnover> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TURNOVER_URL);
    }

    generate(payload: DGeneration) {
        return this.httpSrv.post(GENERATE_URL, payload);
    }

    getTurnover(from: string, to: string) {
        let params = new HttpParams()
            .set('from', from)
            .set('to', to);

        return this.httpSrv.get<Turnover[]>(TURNOVER_URL, params);
    }


}
