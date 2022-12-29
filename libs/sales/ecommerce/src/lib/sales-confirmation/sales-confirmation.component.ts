import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../cart.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Confirmation, Product} from '../ecommerce-api';
import {SnackBarService} from '@ss/common/ui-shell';

@Component({
    selector: 'ss-sales-confirmation',
    templateUrl: './sales-confirmation.component.html',
    styleUrls: ['./sales-confirmation.component.scss',
                '../main-page/main-page.component.scss',
                '../shopping-cart/shopping-cart.component.scss'],
})
export class SalesConfirmationComponent implements OnInit {
    private router     = inject(Router);
    private route      = inject(ActivatedRoute);
    private fb         = inject(FormBuilder);
    private snackBar   = inject(SnackBarService);

    confirming         = false;
    cartSrv            = inject(CartService);
    form               = this.fb.group({
        firstName: ['', Validators.required],
        lastName:  ['', Validators.required],
        address:   ['', Validators.required],
        amount:    [{ value: this.cartSrv.cartAmount, disabled: true}]
    })

    constructor() {}

    ngOnInit(): void {}

    goShopping() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    confirm() {
        const info = this.form.getRawValue();
        const detail = this.cartSrv.cart.map(c => <Product> {
            storeId: c.storeId,
            qty:     c.qty,
            price:  c.price
        });

        this.cartSrv.confirmation = {
            lastName: info.lastName,
            firstName: info.firstName,
            address:   info.address,
            lines: detail
        };
        this.confirming = true;
        this.cartSrv
            .confirm()
            .subscribe({
                next: res => {
                    if (res['count']) {
                        this.snackBar.showSuccessMessage();
                    }
                    this.router.navigate(['../sales-acknowledgement'], {relativeTo: this.route});
                },
                error: err => {
                    this.confirming = false;
                    throw err;
                }
            });
    }
}
