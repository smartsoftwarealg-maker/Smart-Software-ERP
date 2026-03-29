import { Component, effect, inject, input, OnInit } from '@angular/core';
import { SnackBarService } from '@ss/common/ui-shell';
import {
    FormBuilder,
    ReactiveFormsModule,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatMiniFabButton } from '@angular/material/button';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatTooltip } from '@angular/material/tooltip';
import { LoginService } from '@ss/common/api-common';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ScheduledInvoiceService } from '../order-invoicing/scheduled-invoice.service';
import { QuickOrder } from '@ss/sales/ui-quick-order';
import { ShipmentModeService } from '@ss/common/api-lookup';
import { Agent, TransporterService } from '@ss/logistics/api-agent';
import { DriverService, SalesDriver } from '@ss/sales/drivers';

@Component({
    selector: 'ss-quick-order-dispatch',
    templateUrl: 'dispatch.component.html',
    styleUrl: 'dispatch.component.scss',
    standalone: true,
    imports: [
        DatePickerComponent,
        MatFormField,
        MatInput,
        MatLabel,
        MatMiniFabButton,
        ReactiveFormsModule,
        TranslateDirective,
        TranslatePipe,
        UiAutoCompleteComponent,
        MatTooltip,
        CdkTextareaAutosize,
    ],
})
export class DispatchComponent implements OnInit {
    #scheduledInvoiceSrv = inject(ScheduledInvoiceService);
    #snackBarSrv = inject(SnackBarService);
    #formBuilder = inject(FormBuilder);
    #loginSrv = inject(LoginService);
    #shipmentModeSrv = inject(ShipmentModeService);
    #transporterSrv = inject(TransporterService);
    #driverSrv = inject(DriverService);

    shipmentModeLookup = new DefaultAutoCompleteModel(this.#shipmentModeSrv);
    driverLookup = new DefaultAutoCompleteModel(this.#driverSrv);
    public transporterLookup = new DefaultAutoCompleteModel<Agent>(
        this.#transporterSrv,
        'id',
        'denomination',
    );

    quickOrder: QuickOrder;
    id = input(0);

    public form: UntypedFormGroup | null = null;

    constructor() {
        effect(() => {
            if (this.id() > 0) {
                this.refresh();
            }
        });
        this.driverLookup.onObjectSelected = d => this.onDriver(d);
    }

    ngOnInit(): void {
        this.refresh();
        this.id;
    }

    refresh() {
        if (this.id()) {
            this.#scheduledInvoiceSrv.get(this.id()).subscribe({
                next: (quickOrder) => {
                    this.quickOrder = quickOrder;
                    this.form = null
                    this.form = this.setupForm(quickOrder);
                },
            });
        }
    }

    private setupForm(q: QuickOrder): UntypedFormGroup {
        return this.#formBuilder.group({
            id: [q.id],
            centerId: [q.centerId || this.#loginSrv.appCtx.center],
            document: [q.document || 0],
            number: [q.number || 1],
            date: [q.date || new Date(), Validators.required],
            agent: [q.agent],
            userID: [q.userID],
            dealer: [q.dealer],
            payMethod: [q.payMethod],
            locked: [q.locked],
            currency: [q.currency],
            currencyRate: [q.currencyRate || 0, Validators.required],
            dirty: [q.dirty],
            project: [q.project],
            docStatus: [q.docStatus],
            isValidated: [q.isValidated],
            transporter: [q.transporter],
            driver: [q.driver],
            license: [q.license],
            licenseDate: [q.licenseDate],
            licenseIssuer: [q.licenseIssuer],
            plateNumber: [q.plateNumber],
            plateNumber2: [q.plateNumber2],
            reference: [q.reference],
            qty: [q.qty || 0, Validators.required],
            duplicateCount: [q.duplicateCount || 0, Validators.max(50)],
            from: [q.from],
            to: [q.to],
            invoiceType: [
                q.invoiceType || 1,
                [Validators.min(1), Validators.max(2)],
            ],
            shipMode: [0],
            altAgent: [q.altAgent],
            footer: [q.footer],
            discountDescription: [q.discountDescription],
            discount: [{ value: q.discount || 0, disabled: true }],
            fixedDiscountVAT: [q.fixedDiscountVAT || 0],
            paymentId: [q.paymentId],
            driverId: [q.driverId]
        });
    }

    readForm(): QuickOrder {
        return this.form?.getRawValue() as QuickOrder;
    }

    save() {
        const val = this.readForm();
        this.#scheduledInvoiceSrv.save(val).subscribe({
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

    cancel() {
        this.refresh();
        this.form?.markAsPristine();
    }

    private onDriver(d: SalesDriver) {
        this.form?.get('driver')?.setValue(d.description);
        this.form?.get('license')?.setValue(d.licenceNumber);
        this.form?.get('licenseDate')?.setValue(d.licenceDate);
        this.form?.get('licenseIssuer')?.setValue(d.issuedBy);
    }

}
