import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';
import {HttpService} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {AvailableArticle} from '@ss/stock/api-article';
import {Confirmation} from './ecommerce-api';
import {ImageModel} from '@ss/common/ui-image-input';

@Injectable({
    providedIn: 'root'
})

export class CartService extends BaseEntityService<Lookup> {
    confirmation: Confirmation = null;

    cart: AvailableArticle[] = [];
    confirmed: AvailableArticle[] = [];
    cartCount = 0;
    cartAmount = 0;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/ads');
    }

    confirm(): Observable<any> {
        return this.confirmation ?
            this.httpSrv.post('/cart/confirm', this.confirmation) :
            of({count: 0});
    }

    removeFromCart(a: AvailableArticle) {
        const old = this.cart.find(c => c.storeId === a.storeId);
        if (old) {
            old.qty -= 1;
            if (old.qty < 1) {
                this.cart = this.cart.filter(e => e.storeId !== old.storeId);
            }
            this.updateCount();
            this.updateAmount();
        }
    }

    addToCart(a: AvailableArticle) {
        const old = this.cart.find(c => c.storeId === a.storeId);
        if (old) {
            old.qty += 1;
        } else {
            a.qty = 1;
            this.cart.push(a);
        }
        this.updateCount();
        this.updateAmount();
    }

    private updateCount() {
        this.cartCount = this.cart.length == 0 ?
            0 :
            this.cart.map(c => c.qty).reduce((a, b) => a + b);
    }

    private updateAmount() {
        this.cartAmount = this.cart.length == 0 ?
            0 :
            +this.cart.map(c => c.qty * c.price).reduce((a, b) => a + b).toFixed(2);
    }

    clear() {
        this.confirmed = this.cart;
        this.cart = [];
        this.updateCount();
        this.updateAmount();
    }

    clearConfirmation() {
        this.confirmed = [];
    }
}
