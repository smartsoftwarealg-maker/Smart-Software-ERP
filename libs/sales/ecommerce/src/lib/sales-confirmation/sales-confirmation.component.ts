import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../cart.service';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Confirmation, Product} from '../ecommerce-api';
import {SnackBarService} from '@ss/common/ui-shell';
import { HeaderPageComponent } from '../header-page/header-page.component';
import { MatCard } from '@angular/material/card';
import { DecimalPipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ImageInputComponent } from '@ss/common/ui-image-input';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-sales-confirmation',
    templateUrl: './sales-confirmation.component.html',
    styleUrls: ['./sales-confirmation.component.scss',
        '../main-page/main-page.component.scss',
        '../shopping-cart/shopping-cart.component.scss'],
    standalone: true,
    imports: [
    HeaderPageComponent,
    MatCard,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TranslateDirective,
    MatInput,
    CdkTextareaAutosize,
    MatButton,
    MatProgressSpinner,
    ImageInputComponent,
    DecimalPipe,
    TranslatePipe
],
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
        mobile:    ['', Validators.required],
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
            lastName:  info.lastName,
            firstName: info.firstName,
            address:   info.address,
            mobile:    info.mobile,
            lines:     detail
        };
        this.confirming = true;
        this.cartSrv
            .confirm()
            .subscribe({
                next: res => {
                    if (res['count']) {
                        this.snackBar.showSuccessMessage();
                    }
                    this.cartSrv.clear();
                    this.router.navigate(['../sales-acknowledgement'], {relativeTo: this.route}).then();
                },
                error: err => {
                    this.confirming = false;
                    throw err;
                }
            });
    }
}
