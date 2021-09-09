import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaginationModel } from '../../common/pagination/pagination.component';
import { Payment, payMethodsUrl } from './payment-api';
import { Agent } from '../../smart-lib/common/models';
import { HttpService } from '../../smart-lib/common/http.service';
import { Bank, banksUrl } from '../banks/bank';
import { tap, switchMap } from 'rxjs/operators';
import { PaymentMethod } from '../hotel-api';

@Injectable()
export class PaymentService {

    public pagination = PaginationModel.newInstance();
    public parentId;
    private activeEntity: Payment;
    public clients: Agent[] = null;
    public banksIndex: { [key: number]: string; } = null;
    public banks: Bank[];
    public payMethodsIndex: { [key: number]: string; } = null;
    public payMethods: PaymentMethod[];

    constructor(public httpSrv: HttpService) { }

    setActiveEntity(a: Payment) {
        this.activeEntity = a;
    }

    getActiveEntity() {
        const e = this.activeEntity;
        this.activeEntity = null;
        return e;
    }

    load(): Observable<any> {
        if (this.payMethods && this.banks) {
            return of(null);
        }
        return this.httpSrv.getData<Bank>(banksUrl, 0, 49).pipe(
            tap((banks: { body: Bank[] }) => {
                this.banksIndex = {};
                this.banks = banks.body;
                banks.body.forEach(b => this.banksIndex[b.id] = b.description);
            }),
            switchMap(() => this.httpSrv.getData<PaymentMethod>(payMethodsUrl, 0, 49)),
            tap((methods: { body: PaymentMethod[] }) => {
                this.payMethodsIndex = {};
                this.payMethods = methods.body;
                methods.body.forEach(b => this.payMethodsIndex[b.id] = b.description);
            })
        );
    }
}
