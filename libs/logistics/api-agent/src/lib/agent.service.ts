import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService, Password} from '@ss/common/api-common';
import {Agent, AGENT_URL} from './agent-api';
import {Observable, of} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Accounting, Debt, Payment} from '@ss/logistics/api-common';


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

    setURL(url: string) {
        super.url = url;
    }

    currentCustomer(): Observable<Agent> {
        return this.httpSrv.get<Agent>('/ccustomer');
    }

    updatePassword(pwd: Password): Observable<any> {
        return this.httpSrv.post('/password', pwd);
    }

    getPayments(id: number): Observable<Payment[]> {
        return id? this.httpSrv.get<Payment[]>(`/agents/${id}/payments`) : of([]);
    }

    getCompensations(agentId: number, idList: string): Observable<Accounting[]> {
        const params = new HttpParams().set('id', idList);
        return agentId && idList.length > 0? this.httpSrv.get<Accounting[]>(`/agents/${agentId}/compensations`, params) : of([]);
    }

    getDebts(agentId: number): Observable<Debt[]> {
        return agentId? this.httpSrv.get<Debt[]>(`/agents/${agentId}/debtdocs`) : of([]);
    }

    makePayment(payId: number, docId: number, date: string, amount: number): Observable<{ id: number }> {
        const data = { payId: payId, docId: docId, amount: amount, date: date};
        return  this.httpSrv.post('/payments/compensations', data);
    }

    cancelPayment(payId: number): Observable<{ count: number }> {
        return this.httpSrv.remove(`/payments/compensations/${payId}`);
    }
 }
