import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {CONSUMPTION_LINES_URL, ConsumptionLine} from "./consumption-lines-api";
import {CONSUMPTION_URL} from "@ss/stock/api-consumption";


@Injectable({
    providedIn: 'root'
})
export class ConsumptionLinesService extends BaseEntityService<ConsumptionLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CONSUMPTION_LINES_URL,CONSUMPTION_URL);
    }

}
