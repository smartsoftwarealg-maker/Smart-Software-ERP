import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CProject } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CostingProjectService extends BaseEntityService<CProject> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/costing/projects');
    }
}
