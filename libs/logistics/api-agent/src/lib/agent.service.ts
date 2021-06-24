import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Agent, AGENT_URL} from './agent-api';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AgentService extends BaseEntityExtendedService<Agent> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, AGENT_URL);
    }

    getByIDList(ids: Array<number>): Observable<Agent[]> {
        return this.httpSrv.get<Agent[]>('/agents?ids=' + ids.join(','));
    }
}
