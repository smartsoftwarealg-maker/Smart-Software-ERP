import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../cart.service';
import { HeaderPageComponent } from '../header-page/header-page.component';
import { DecimalPipe } from '@angular/common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { ImageInputComponent } from '@ss/common/ui-image-input';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-sales-acknowledgement',
    templateUrl: './sales-acknowledgement.component.html',
    styleUrls: [
        './sales-acknowledgement.component.scss',
        '../main-page/main-page.component.scss',
        '../shopping-cart/shopping-cart.component.scss',
        '../sales-confirmation/sales-confirmation.component.scss'
    ],
    standalone: true,
    imports: [
    HeaderPageComponent,
    TranslateDirective,
    MatButton,
    MatCard,
    ImageInputComponent,
    DecimalPipe,
    TranslatePipe
],
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
