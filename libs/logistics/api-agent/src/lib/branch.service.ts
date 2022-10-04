import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService, Password} from '@ss/common/api-common';
import {Agent, AGENT_URL, BRANCH_URL, CONSUMER_URL, CUSTOMER_URL} from './agent-api';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class BranchService extends BaseEntityExtendedService<Agent> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, BRANCH_URL);
    }

    getByIDList(ids: Array<number>): Observable<Agent[]> {
        return this.httpSrv.get<Agent[]>('/branches?ids=' + ids.join(','));
    }

    currentCustomer(): Observable<Agent> {
        return this.httpSrv.get<Agent>('/branches');
    }

    updatePassword(pwd: Password): Observable<any> {
        return this.httpSrv.post('/password', pwd);
    }
 }
