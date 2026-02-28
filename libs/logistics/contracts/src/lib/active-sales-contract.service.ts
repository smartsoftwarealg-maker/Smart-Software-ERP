import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Project,  } from './contract-api.class';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root',
})
export class ActiveSalesContractService extends BaseEntityService<Project> {
    selectedId = 0;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/active-projects', '/agents');
    }
}
