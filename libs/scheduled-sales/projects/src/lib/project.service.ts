import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {SS_PROJECT_URL, SSProject} from '@ss/scheduled-sales/api-scheduled-sales';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseEntityService<SSProject> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SS_PROJECT_URL);
    }
}
