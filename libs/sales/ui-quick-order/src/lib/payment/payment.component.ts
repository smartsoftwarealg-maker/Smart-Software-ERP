import { Component, effect, inject, input } from '@angular/core';
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
import { PayMode, PayModeService } from '@ss/common/api-lookup';
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
import { LanguageService, LoginService } from '@ss/common/api-common';
import { QuickOrderService } from '../quick-order.service';
import { QuickOrder } from '../quick-order.api';
import { catchError, concatMap, of, throwError, switchMap, debounceTime, distinctUntilChanged } from 'rxjs';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { SalesOrderLinesService } from '@ss/logistics/api-transaction';
import { JsonPipe } from '@angular/common';

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
    #langSrv = inject(LanguageService);
    #confirmationSrv = inject(ConfirmationDialogService);
    #entitySrv = inject(PaymentsDetailService);
    #quickOrderSrv = inject(QuickOrderService);
    #typeSrv = inject(PayModeService);
    #bankSrv = inject(BankService);
    #snackBarSrv = inject(SnackBarService);
    #formBuilder = inject(FormBuilder);
    #loginSrv = inject(LoginService);
    #orderLineSrv = inject(SalesOrderLinesService);
    readonly #check = this.#langSrv.translate('COMMON_CHECK');
    readonly #CHECK = 2;

    bankAutoCompleteModel = new DefaultAutoCompleteModel(this.#bankSrv);
    modeAutoCompleteModel = new DefaultAutoCompleteModel(this.#typeSrv);

    quickOrder: QuickOrder;
    id = input(0);
    isDisabled = input(true);
    public form: UntypedFormGroup | null = null;

    constructor() {
        effect(() => {
            if (this.id() > 0) {
                this.loadPayment();
            }
        });
        this.modeAutoCompleteModel.onObjectSelected = (m) => {
            if (this.form?.controls['id'].value == 0) {
                this.onModeChange(m);
            }
        };
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
            this.getCredit();
        }
    }

    private setupForm(p: Payment): UntypedFormGroup {
        const db = p.amount > 0.0 ? p.amount : 0.0;
        const cr = p.amount < 0.0 ? -p.amount : 0.0;
        p.mode = p.mode || 2;
        p.description = p.description || this.#check;

        const form = this.#formBuilder.group({
            id: [p.id],
            center: [p.center || this.#loginSrv.appCtx.center],
            number: [p.number || ''],
            checkBank: [p.checkBank],
            bank: [p.bank],
            description: [p.description],
            date: [p.date || new Date(), Validators.required],
            dueDays: [p.dueDays || 0],
            agent: [p.agent || this.quickOrder.agent],
            debit: [{ value: 0, disabled: true }, Validators.required],
            credit: [
                { value: cr, disabled: db > 0.000001 },
                Validators.required,
            ],
            mode: [p.mode || 2, Validators.required],
            canceled: [p.canceled || false],
        });

        if (this.isDisabled()) {
            form.disable();
        }

        form.controls['number']?.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe((res) => {
                const mode = this.modeAutoCompleteModel.cache;
                this.form
                    ?.get('description')
                    .setValue((mode?.description || '') + ' ' + (res || ''));
            });
        this.form = form;
        this.onModeChange({ id: p.mode, description: '' });
        return form;
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
        if (val.mode !== this.#CHECK) {
            val.number = '';
            val.checkBank = null;
            val.bank = null;
        }
        this.#entitySrv
            .save(val)
            .pipe(
                concatMap((res) => {
                    if (!(this.quickOrder.paymentId > 0)) {
                        this.quickOrder.paymentId = res;
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
        this.form?.markAsUntouched();
        this.form?.markAsPristine();
    }

    delete() {
        if (this.form?.controls['id'].value) {
            this.#confirmationSrv
                .confirmDelete()
                .pipe(
                    switchMap((res) =>
                        res
                            ? this.#entitySrv.remove(
                                  this.form?.controls['id'].value,
                              )
                            : of(null),
                    ),
                )
                .subscribe((res) => {
                    if (res) {
                        this.quickOrder.paymentId = null;
                        this.refresh(0);
                        this.form?.markAsPristine();
                    }
                });
        }
    }

    onModeChange(mode: PayMode) {
        this.form?.get('description')?.setValue(mode.description);
        if (mode.id === 2) {
            this.form?.get('number')?.setValidators(Validators.required);
            this.form?.get('checkBank')?.setValidators(Validators.required);
        } else {
            this.form?.get('number')?.clearValidators();
            this.form?.get('checkBank')?.clearValidators();
        }
        this.form?.get('number')?.updateValueAndValidity();
        this.form?.get('checkBank')?.updateValueAndValidity();
    }

    getCredit() {
        this.#entitySrv.getTotal(this.#orderLineSrv.getParentId()).subscribe({
            next: (t) => {
                const fft = t.find((t) => (t.description = 'LOGISTICS_FTT'));
                const vf = t.find((t) => (t.description = 'LOGISTICS_VF'));
                this.form?.controls['credit']?.setValue(
                    fft?.value | vf?.value | 0,
                );
            },
        });
    }
}
