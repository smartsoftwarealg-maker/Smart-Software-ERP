import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { Lookup } from "@ss/common/api-lookup";
import { LTM_EQUIPMENT_URL } from '@ltm/ltm-api';

@Injectable({
  providedIn: 'root'
})
export class LtmEquipmentService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_EQUIPMENT_URL);
    }
}
