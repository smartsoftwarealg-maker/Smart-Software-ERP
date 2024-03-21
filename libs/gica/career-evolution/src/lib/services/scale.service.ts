import
{ Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { GICA_SCALES, Scale } from '../gica-careers-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class ScaleService extends BaseEntityService<Scale> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, GICA_SCALES);
    }
}
