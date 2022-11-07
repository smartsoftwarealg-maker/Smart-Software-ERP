import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Cartline, Order, Review, Total} from '@ss/sales/shopping-cart';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
    private _lines: Cartline[] = [];

    constructor(protected httpSrv: HttpService) {}

    getTotal(lines: Cartline[]): Observable<Total> {
        this._lines = lines;
        return this.httpSrv.post('/checkout', lines);
    }

    authorise(order: Order, baseURL: string): Observable<string> {
        return this.httpSrv
            .post('/authorize-payment', { order: order, baseURL: baseURL})
            .pipe(map(res => res['url']));
    }

    review(paymentId: string, payerID: string): Observable<Review> {
        return this.httpSrv
            .get<Review>(`/payment-review?paymentId=${paymentId}&payerId=${payerID}`);
    }

    executePayment(paymentId: string, payerID: string): Observable<any> {
        const payload = {lines: this._lines, paymentId: paymentId, payerId: payerID};
        return this.httpSrv.post('/execute-payment', payload);
    }
}
