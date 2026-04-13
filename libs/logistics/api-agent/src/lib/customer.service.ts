import {Injectable} from '@angular/core';
import {HttpService, Password} from '@ss/common/api-common';
import {Agent, CUSTOMER_URL} from './agent-api';
import {Observable} from 'rxjs';
import { BaseAgentClass } from './base-agent.class';


@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BaseAgentClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CUSTOMER_URL);
    }

    getByIDList(ids: Array<number>): Observable<Agent[]> {
        return this.httpSrv.get<Agent[]>('/customers?ids=' + ids.join(','));
    }

    currentCustomer(): Observable<Agent> {
        return this.httpSrv.get<Agent>('/ccustomer');
    }

    updatePassword(pwd: Password): Observable<any> {
        return this.httpSrv.post('/password', pwd);
    }
 }
