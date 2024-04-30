import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { LTM_EQUIPMENTS_URL } from '../ltm-api';
import {HttpService} from '@ss/common/api-common';
import { Lookup } from "@ss/common/api-lookup";

@Injectable({
  providedIn: 'root'
})
export class LtmEquipmentService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_EQUIPMENTS_URL);
    }
}
