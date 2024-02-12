import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CProject } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CostingProjectService extends BaseEntityService<CProject> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/costing/projects');
    }


    duplicate(project: CProject): Observable<{ count: number }> {
        return this.httpSrv.put('/costing/duplicate', project);
    }
}
