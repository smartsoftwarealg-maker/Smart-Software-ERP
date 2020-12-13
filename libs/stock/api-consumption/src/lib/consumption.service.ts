import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {CONSUMPTION_URL, Consumption} from "./consumption-api";


@Injectable({
    providedIn: 'root'
})
export class ConsumptionService extends BaseEntityService<Consumption> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CONSUMPTION_URL);
    }

}
