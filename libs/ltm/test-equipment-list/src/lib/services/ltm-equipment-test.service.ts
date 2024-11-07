import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { LTMTestEquipmentTest, LTMTestingEquipment } from '@ss/ltm/ltm';

@Injectable({
    providedIn: 'root'
})
export class LtmEquipmentTestService extends BaseEntityService<LTMTestEquipmentTest> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/tests', '/ltm/equipment');
    }
}
