import { Component, OnInit } from '@angular/core';
import {CheckoutService} from '../checkout.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {of, switchMap} from 'rxjs';
import {Order, Review} from '@ss/sales/shopping-cart';

import { MatCard, MatCardActions } from '@angular/material/card';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
    standalone: true,
    imports: [
    MatCard,
    TranslateDirective,
    MatCardActions,
    MatButton,
    TranslatePipe
],
})
export class ReviewComponent implements OnInit {
    private paymentId: string | null = null;
    private payerID: string | null = null;
    review: Review = null;
    // payment: Order = null;

    constructor(private checkoutSrv: CheckoutService,
                private route: ActivatedRoute,
                private router: Router) {}

    ngOnInit(): void {
        this.route
            .queryParamMap
            .pipe(switchMap(res => {
                this.paymentId = res.get("paymentId");
                this.payerID = res.get("PayerID");
                return this.checkoutSrv.review(this.paymentId, this.payerID);
            })).subscribe(review => this.review = review);
    }

    payNow() {
        this.checkoutSrv
            .executePayment(this.paymentId, this.payerID)
            .subscribe(res => this.router.navigate(['../cart'], { relativeTo: this.route }).then());
    }

    // goHome() {
    //     this.router.navigate(['/cart']).then();
    // }
}
