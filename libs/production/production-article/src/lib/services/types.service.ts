import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ActivityCategory, ActivityType} from "@ss/master-data/api-article";

export const TYPE_URL = '/production/activity-types';

@Injectable({
    providedIn: 'root'
})
export class ActivityTypesService extends BaseEntityService<ActivityType> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TYPE_URL);
    }
}
