import { Component, effect, inject, input, signal } from '@angular/core';
import { SnackBarService } from '@ss/common/ui-shell';
import {
    UntypedFormGroup,
    FormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { PayModeService } from '@ss/common/api-lookup';
import { BankService } from '@ss/administration/api-bank';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
} from '@angular/material/input';
import { MatMiniFabButton } from '@angular/material/button';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatTooltip } from '@angular/material/tooltip';
import { PaymentsDetailService } from '@ss/logistics/payments';
import { Payment } from '@ss/logistics/api-common';
import { LoginService } from '@ss/common/api-common';
import { QuickOrderService } from '../quick-order.service';
import { QuickOrder } from '../quick-order.api';
import { catchError, concatMap, of, throwError } from 'rxjs';

@Component({
    selector: 'ss-quick-order-payment',
    templateUrl: 'payment.component.html',
    styleUrl: 'payment.component.scss',
    standalone: true,
    imports: [
        DatePickerComponent,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MatMiniFabButton,
        ReactiveFormsModule,
        TranslateDirective,
        TranslatePipe,
        UiAutoCompleteComponent,
        MatTooltip,
    ],
})
export class PaymentComponent {
    #entitySrv = inject(PaymentsDetailService);
    #quickOrderSrv = inject(QuickOrderService);
    #typeSrv = inject(PayModeService);
    #bankSrv = inject(BankService);
    #snackBarSrv = inject(SnackBarService);
    #formBuilder = inject(FormBuilder);
    #loginSrv = inject(LoginService);

    bankAutoCompleteModel = new DefaultAutoCompleteModel(this.#bankSrv);
    modeAutoCompleteModel = new DefaultAutoCompleteModel(this.#typeSrv);

    quickOrder: QuickOrder;
    id = input(0);
    public form: UntypedFormGroup | null = null;

    constructor() {
        effect(() => {
            if (this.id() > 0) {
                this.loadPayment();
            }
        });
    }

    loadPayment() {
        if (this.id()) {
            this.#quickOrderSrv.get(this.id()).subscribe({
                next: (quickOrder) => {
                    this.quickOrder = quickOrder;
                    this.refresh(quickOrder.paymentId);
                },
            });
        }
    }

    refresh(id: number) {
        if (id) {
            this.#entitySrv.get(id).subscribe({
                next: (payment) => {
                    this.form = this.setupForm(payment);
                },
            });
        } else {
            this.form = this.setupForm({ id: 0 } as Payment);
        }
    }

    private setupForm(p: Payment): UntypedFormGroup {
        const db = p.amount > 0.0 ? p.amount : 0.0;
        const cr = p.amount < 0.0 ? -p.amount : 0.0;
        return this.#formBuilder.group({
            id: [p.id],
            center: [p.center || this.#loginSrv.appCtx.center],
            number: [p.number || '0'],
            bankId: [p.bankId],
            bank: [p.bank],
            description: [p.description, Validators.required],
            date: [p.date || new Date(), Validators.required],
            dueDays: [p.dueDays || 0, Validators.required],
            agent: [p.agent || this.quickOrder.agent],
            debit: [
                { value: db, disabled: cr > 0.000001 },
                Validators.required,
            ],
            credit: [
                { value: cr, disabled: db > 0.000001 },
                Validators.required,
            ],
            mode: [p.mode || 2, Validators.required],
            canceled: [p.canceled || false],
        });
    }

    readForm(): Payment {
        const p = this.form?.getRawValue() as Payment;
        p.amount = p['debit'] || 0 - p['credit'] || 0;
        p.debit = p.credit = null;
        p.center = this.#loginSrv.appCtx.center;
        return p;
    }

    save() {
        const val = this.readForm();
        this.#entitySrv
            .save(val)
            .pipe(
                concatMap((res) => {
                    if (!(this.quickOrder.paymentId > 0)) {
                        const order = {
                            ...this.quickOrder,
                            paymentId: res,
                        };
                        return this.#quickOrderSrv.save(order);
                    } else {
                        return of(res);
                    }
                }),
                catchError((error) => {
                    this.#snackBarSrv.showFailureMessage();
                    return throwError(() => error);
                }),
            )
            .subscribe({
                next: () => {
                    this.cancel();
                    this.form?.markAsUntouched();
                    this.#snackBarSrv.showSuccessMessage();
                },
                error: (error) => {
                    this.#snackBarSrv.showFailureMessage();
                    throw error;
                },
            });
    }

    onDebitChange(_: Event) {
        this.onAmountChange('credit');
    }

    onCreditChange(_: Event) {
        this.onAmountChange('debit');
    }

    private onAmountChange(ctrl: string): void {
        const src = ctrl == 'debit' ? 'credit' : 'debit';
        const value = this.form.controls[src].value;
        if (value > 0.0) {
            this.form.controls[ctrl].setValue(0);
            this.form.controls[ctrl].disable({
                onlySelf: true,
                emitEvent: false,
            });
        } else {
            this.form.controls[ctrl].enable();
        }
    }

    cancel() {
        this.refresh(this.quickOrder.paymentId);
        this.form?.markAsPristine();
    }

    delete() {
        this.refresh(0);
        this.form?.markAsPristine();
    }
}
