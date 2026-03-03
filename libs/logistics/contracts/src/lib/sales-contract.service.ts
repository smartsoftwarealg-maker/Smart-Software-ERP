import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Project, PROJECT_AGENT_URL, PROJECT_URL, ProjectCode } from './contract-api.class';
import {HttpService} from '@ss/common/api-common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SalesContractService extends BaseEntityService<Project> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, PROJECT_URL, PROJECT_AGENT_URL);
    }

    getProjectCode(id: number): Observable<ProjectCode> {
        return this.httpSrv.get<ProjectCode>(`/logistics/project-code?id=${id}`);
    }

}
