import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ABSENCE_TYPE_URL, AbsenceType} from './attendance-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class AbsenceTypeService extends BaseEntityService<AbsenceType> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ABSENCE_TYPE_URL);
    }
}
