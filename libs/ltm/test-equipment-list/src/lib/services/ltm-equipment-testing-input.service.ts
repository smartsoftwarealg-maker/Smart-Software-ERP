import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { LTMEquipmentTesting, LTMTestEquipmentTest, LTMTestEquipmentTestingInput } from '@ltm/ltm-api';

@Injectable({
    providedIn: 'root'
})
export class LtmEquipmentTestingInputService extends BaseEntityService<LTMTestEquipmentTestingInput> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/ltm/equipment-batch');
    }
}
