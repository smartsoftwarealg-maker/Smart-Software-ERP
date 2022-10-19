import {Injectable} from "@angular/core";
import {BaseEntityExtendedService} from "@ss/common/api-base-entity";
import {HttpService} from "@ss/common/api-common";
import {Observable} from "rxjs";
import {Cart, Cartline, CARTLINES_URL} from '@ss/sales/shopping-cart';

@Injectable({
    providedIn: 'root'
})
export class FoodCartService extends BaseEntityExtendedService<Cartline> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CARTLINES_URL);
    }

    getTotal(): Observable<{ total: number }> {
        return this.httpSrv.get<{ total: number }>('/cart/total');
    }

    addItem(item: Cartline): Observable<{ id: number }> {
        return this.httpSrv.post('/cartlines', item);
    }

    removeItem(item: Cartline): Observable<{ count: number }> {
        return this.httpSrv.remove(`/cartlines/${item.id}`);
    }

    addQty(item: Cartline, qty: number): Observable<{ count: number }> {
        const newItem: Cartline = {
            id: item.id,
            cartId: item.cartId,
            reference: item.reference,
            description: item.description,
            qty: item.qty + qty,
            price: item.price,
            validated: false
        };

        return this.httpSrv.put(`/cartlines`, newItem);
    }

    confirm(cart: Cart): Observable<{ count: number }> {
        return this.httpSrv.put('/cart', cart);
    }
}
