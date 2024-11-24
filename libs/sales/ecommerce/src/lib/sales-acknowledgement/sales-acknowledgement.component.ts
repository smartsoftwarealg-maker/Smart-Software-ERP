import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../cart.service';
import { HeaderPageComponent } from '../header-page/header-page.component';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { ImageInputComponent } from '../../../../../common/ui-image-input/src/lib/image-input.component';
import { TranslatePipe } from '../../../../../common/ui-lang/src/lib/translate.pipe';

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
        NgIf,
        TranslateDirective,
        MatButton,
        NgFor,
        MatCard,
        ImageInputComponent,
        DecimalPipe,
        TranslatePipe,
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
