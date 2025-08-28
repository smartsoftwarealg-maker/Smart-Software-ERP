import {Component, inject, OnInit} from '@angular/core';
import {CartService} from '../cart.service';
import {ImageUploaderUtil} from '@ss/common/api-common';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AvailableArticle} from '@ss/master-data/api-article';
import { HeaderPageComponent } from '../header-page/header-page.component';
import { DecimalPipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { ImageInputComponent } from '@ss/common/ui-image-input';
import { MatIconButton, MatButton } from '@angular/material/button';
import { TranslateDirective } from '@ss/common/ui-lang';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss', '../main-page/main-page.component.scss'],
    standalone: true,
    imports: [
    HeaderPageComponent,
    MatCard,
    ImageInputComponent,
    MatIconButton,
    TranslateDirective,
    MatButton,
    DecimalPipe,
    TranslatePipe
],
})
export class ShoppingCartComponent implements OnInit {
    private router     = inject(Router);
    private route      = inject(ActivatedRoute);

    cartSrv       = inject(CartService);
    uploadUtil    = new ImageUploaderUtil();
    searchControl = new FormControl('');

    constructor() {}

    ngOnInit(): void {}

    goShopping() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    removeFromCart(a: AvailableArticle) {
        this.cartSrv.removeFromCart(a);
    }

    addToCart(a: AvailableArticle) {
        this.cartSrv.addToCart(a);
    }

    confirm() {
        this.router.navigate(['../sales-confirmation'], { relativeTo: this.route });
    }
}
