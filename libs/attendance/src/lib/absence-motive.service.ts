import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { ABSENCE_MOTIVE_URL } from './attendance-api';
import {HttpService} from '@ss/common/api-common';
import { Lookup } from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class AbsenceMotiveService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ABSENCE_MOTIVE_URL);
    }
}
