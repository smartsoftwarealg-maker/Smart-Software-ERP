import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {PROJECT_MOTIVE_URL, PROJECT_TYPE_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class ProjectMotiveService extends BaseEntityService<Lookup> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, PROJECT_MOTIVE_URL);
    }

}
