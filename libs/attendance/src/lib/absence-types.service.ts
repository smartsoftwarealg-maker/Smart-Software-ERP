import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {ABSENCE_TYPE_URL, AbsenceType} from './attendance-api';

@Injectable({
  providedIn: 'root'
})
export class AbsenceTypesService extends BaseEntityService<AbsenceType> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ABSENCE_TYPE_URL);
    }
}
