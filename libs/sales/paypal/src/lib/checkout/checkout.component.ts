import { Component, inject, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions } from '@angular/material/dialog';
import {Cartline, Total} from '@ss/sales/shopping-cart';
import {CheckoutService} from '../checkout.service';
import { FormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { TranslateDirective } from "../../../../../common/ui-lang/src/lib/translate.directive";
import { NgIf } from "@angular/common";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";

@Component({
    selector: 'ss-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    standalone: true,
    imports: [
        TranslateDirective,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatDialogActions,
        MatButton,
    ],
})
export class CheckoutComponent implements OnInit {
    private fb = inject(FormBuilder);
    total: Total = null;
    status: string = null;
    form: UntypedFormGroup = null;
    constructor(private dialogRef: MatDialogRef<CheckoutComponent>,
                @Inject(MAT_DIALOG_DATA) private data: Cartline[],
                private checkoutSrv: CheckoutService,
                private router: Router) {}

    ngOnInit(): void {
        this.checkoutSrv
            .getTotal(this.data)
            .subscribe(res => {
                this.total = res;
                this.form = this.fb.group({
                    productName: [{ value: res.productName, disabled: true }],
                    subtotal:    [{ value: res.subtotal.toFixed(2), disabled: true }],
                    tax:         [{ value: res.tax.toFixed(2), disabled: true }],
                    freight:     [{ value: res.freight.toFixed(2), disabled: true }],
                    shipping:    [{ value: res.shipping.toFixed(2), disabled: true }],
                    total:       [{ value: (res.tax + res.subtotal + res.shipping + res.shipping).toFixed(2), disabled: true }],
                    currency:    ['EUR'],
                    customer:    this.fb.group({
                            firstName: [null, Validators.required],
                            lastName:  [null, Validators.required],
                            address:   [null, [Validators.required, Validators.minLength(20)]],
                            email:     [null]
                    })
                });
            });
    }

    onClose() {
        const order = this.form.getRawValue();
        const href = window.location.href;
        const url = href.substring(0, href.lastIndexOf('/'))
        this.checkoutSrv
            .authorise(order, url)
            .subscribe(res => {
                this.status = res;
                this.dialogRef.close(res);
            });
    }

    onCancel() {
        this.dialogRef.close(false);
    }
}
