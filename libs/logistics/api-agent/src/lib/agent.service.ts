import {Injectable} from '@angular/core';
import {HttpService, Password} from '@ss/common/api-common';
import {Agent, AGENT_URL} from './agent-api';
import {Observable, of} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Accounting, Debt, Payment} from '@ss/logistics/api-common';
import { BaseAgentClass } from './base-agent.class';

@Injectable({
    providedIn: 'root'
})
export class AgentService extends BaseAgentClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, AGENT_URL);
    }

    getByIDList(ids: Array<number>): Observable<Agent[]> {
        return this.httpSrv.get<Agent[]>('/agents?ids=' + ids.join(','));
    }

    override setURL(url: string) {
        super.url = url;
    }

    currentCustomer(): Observable<Agent> {
        return this.httpSrv.get<Agent>('/ccustomer');
    }

    updatePassword(pwd: Password): Observable<any> {
        return this.httpSrv.post('/password', pwd);
    }

    getPayments(id: number, offset: number, limit: number): Observable<{ body: Payment[], itemCount: number }> {
        return id? this.httpSrv.getData<Payment>(`/agents/${id}/payments`, offset, limit) : of({ body: [], itemCount: 0 });
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

    getNextCode(prefix: string, agentType: number): Observable<{ code: string }> {
        const params = new HttpParams().set('prefix', prefix).set('agentType', agentType.toString());
        return this.httpSrv.get<{ code: string }>(`/agents/next-code`, params);
    }

}
