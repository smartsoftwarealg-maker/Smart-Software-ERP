import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ATTSignature, Holiday, HOLIDAY_URL, SIGNATURE_URL, WORK_SHIFT_URL, WorkShift} from './attendance-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class SignatureService extends BaseEntityService<ATTSignature> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SIGNATURE_URL);
    }
}
