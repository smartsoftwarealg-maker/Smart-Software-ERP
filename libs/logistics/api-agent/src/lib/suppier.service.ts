import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService, Password} from '@ss/common/api-common';
import {Agent, SUPPLIER_URL} from './agent-api';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SupplierService extends BaseEntityExtendedService<Agent> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, SUPPLIER_URL);
    }

    getByIDList(ids: Array<number>): Observable<Agent[]> {
        return this.httpSrv.get<Agent[]>('/suppliers?ids=' + ids.join(','));
    }

    currentCustomer(): Observable<Agent> {
        return this.httpSrv.get<Agent>('/ccustomer');
    }

    updatePassword(pwd: Password): Observable<any> {
        return this.httpSrv.post('/password', pwd);
    }
 }
