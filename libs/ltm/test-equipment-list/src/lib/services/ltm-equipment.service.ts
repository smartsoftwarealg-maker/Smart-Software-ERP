import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { LTMTestingEquipment } from '@ss/ltm/ltm';

@Injectable({
    providedIn: 'root'
})
export class LtmEquipmentService extends BaseEntityService<LTMTestingEquipment> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/ltm/equipment');
    }
}
