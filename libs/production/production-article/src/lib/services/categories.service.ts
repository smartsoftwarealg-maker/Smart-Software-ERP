import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ActivityCategory} from "@ss/master-data/api-article";

export const CATEGORY_URL = '/production/activity-categories';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService extends BaseEntityService<ActivityCategory> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CATEGORY_URL);
    }
}
