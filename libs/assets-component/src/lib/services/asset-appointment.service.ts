import {Injectable} from '@angular/core';
import {APPOINTMENT_URL, ASSAppointment, ASSETS_URL} from '../assets-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
  providedIn: 'root'
})

export class AssetAppointmentService extends BaseEntityService<ASSAppointment>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, APPOINTMENT_URL, ASSETS_URL);
        this.setParentId(0);
    }
}
