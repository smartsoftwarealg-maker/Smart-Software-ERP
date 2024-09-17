import {Injectable} from '@angular/core';
import {APPOINTMENT_URL, ASSAppointment, ASSETS_URL} from '../assets-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { HttpParams } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AssetAppointmentService extends BaseEntityService<ASSAppointment>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, APPOINTMENT_URL, ASSETS_URL);
        this.setParentId(0);
    }

}
