import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { LTM_NORM_URL, LTMTestSchedule } from '../ltm-api';
import {HttpService} from '@ss/common/api-common';
import { Lookup } from '@ss/common/api-lookup';

@Injectable({
  providedIn: 'root'
})
export class LtmTestScheduleService extends BaseEntityService<LTMTestSchedule> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/schedules', '/ltm/tests');
    }
}
