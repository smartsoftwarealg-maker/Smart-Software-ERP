import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../cart.service';

@Component({
    selector: 'ss-sales-acknowledgement',
    templateUrl: './sales-acknowledgement.component.html',
    styleUrls: [
        './sales-acknowledgement.component.scss',
        '../main-page/main-page.component.scss',
        '../shopping-cart/shopping-cart.component.scss',
        '../sales-confirmation/sales-confirmation.component.scss'],
})
export class SalesAcknowledgementComponent implements OnInit, OnDestroy {
    private router     = inject(Router);
    private route      = inject(ActivatedRoute);

    cartSrv            = inject(CartService);

    constructor() {}

    ngOnInit(): void {}

    goShopping() {
        this.router.navigate(['../'], { relativeTo: this.route }).then(() => this.cartSrv.clearConfirmation());
    }

    ngOnDestroy() {
        this.cartSrv.clearConfirmation();
    }
}
