import {Injectable} from "@angular/core";
import {BaseEntityExtendedService} from "@ss/common/api-base-entity";
import {CART_URL, CARTLINES_URL, Cartline, Cart} from './cartline';
import {HttpService} from "@ss/common/api-common";
import {CARD_URL} from "@ss/logistics/api-card";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService extends BaseEntityExtendedService<Cartline> {
    constructor(protected httpSrv: HttpService) {
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

    removeOneItem(item: Cartline): Observable<{ count: number }> {
        const newItem: Cartline = {
            id: item.id,
            cartId: item.cartId,
            reference: item.reference,
            description: item.description,
            qty: item.qty - 1,
            price: item.price,
            dirty: false
        };

        return this.httpSrv.put(`/cartlines`, newItem);
    }

    confirm(cart: Cart): Observable<{ count: number }> {
        return this.httpSrv.put('/cart', cart);
    }
}
