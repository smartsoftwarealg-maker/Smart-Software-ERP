import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { LTMTestingEquipment } from '@ltm/ltm-api';

@Injectable({
    providedIn: 'root'
})
export class LtmTestingEquipmentService extends BaseEntityService<LTMTestingEquipment> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/ltm/testing-equipment');
    }
}
