import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {EDUCATION_LEVEL_URL, EducationLevel} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class EducationLevelService extends BaseEntityService<EducationLevel> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, EDUCATION_LEVEL_URL);
    }

}
