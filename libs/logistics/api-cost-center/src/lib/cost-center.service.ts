import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {COST_CENTER_URL, CostCenter} from "./cost-center-api";


@Injectable({
    providedIn: 'root'
})
export class CostCenterService extends BaseEntityService<CostCenter> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, COST_CENTER_URL);
    }

}
