import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService, Password} from '@ss/common/api-common';
import {Agent, AGENT_URL, CUSTOMER_URL} from './agent-api';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BaseEntityExtendedService<Agent> {

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
