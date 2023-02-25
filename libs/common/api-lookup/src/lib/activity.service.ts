import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Activity, ACTIVITY_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class ActivityService extends BaseEntityService<Activity> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACTIVITY_URL);
    }

}
