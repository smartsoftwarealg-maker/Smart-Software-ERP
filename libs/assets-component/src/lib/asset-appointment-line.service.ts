import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {APPOINTMENT_URL, AssetAppointmentLine, ASSET_APPOINTMENT_LINE_URL, ASSET_APPOINTMENT_URL} from './assets-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class AssetAppointmentLineService extends BaseEntityService<AssetAppointmentLine>{
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSET_APPOINTMENT_LINE_URL, APPOINTMENT_URL);
    }
}
