import { Injectable } from '@angular/core';
import {BaseEntityService} from "@ss/common/api-base-entity";
import {HttpService} from "@ss/common/api-common";
import {ADVANCEMENTS_URL, Payment} from "@ss/logistics/api-common";

@Injectable({
  providedIn: 'root'
})
export class AdvancementsService extends BaseEntityService<Payment>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ADVANCEMENTS_URL);
    }
}
