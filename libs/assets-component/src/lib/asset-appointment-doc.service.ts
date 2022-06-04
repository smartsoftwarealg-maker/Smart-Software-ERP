import { Injectable } from '@angular/core';
import {ASSAppointmentHeader, ASSET_APPOINTMENT_URL} from './assets-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
  providedIn: 'root'
})
export class AssetAppointmentDocService extends BaseEntityService<ASSAppointmentHeader>{

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, ASSET_APPOINTMENT_URL);
  }
}
