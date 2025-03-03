import { Component, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    BaseChildEntityDetailComponent,
} from '@ss/common/ui-base-entity';
import {Compensation} from '../services/compensation-api';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { InvoicePaymentService } from '../services/invoice-payment.service';
import { FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CompensationDetailService } from '../services/compensation-detail.service';

@Component({
    selector: 'ss-invoice-payments',
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        FormsModule,
        DatePickerComponent,
        UiAutoCompleteComponent,
        TranslatePipe
    ],
    templateUrl: './sales-compensation-detail.component.html',
    styleUrl: './sales-compensation-detail.component.scss',
})
export class SalesCompensationDetailComponent extends BaseChildEntityDetailComponent<Compensation> implements OnDestroy {
    #parentId = 0;
    #formBuilder = inject(UntypedFormBuilder);
    #paymentSrv = inject(InvoicePaymentService);

    paymentLookup = new DefaultAutoCompleteModel(this.#paymentSrv);
    checkAmount = signal<number>(0);

    constructor(override entitySrv: CompensationDetailService) {
        super(entitySrv, 'InvoicePayment');
    }

    override setupForm(a: Compensation): UntypedFormGroup {
        this.entitySrv.isEditInProgress = true;
        this.entitySrv.setParentId(this.#parentId);
        return this.form = this.#formBuilder.group({
            id:           [a.id],
            agentId:      [a.agentId || this.#paymentSrv.getParentId(), Validators.required],
            parentId:     [a.parentId || this.entitySrv.getParentId(), Validators.required],
            paymentId:    [a.paymentId, Validators.required],
            description:  [a.description],
            creationTime: [a.creationTime || new Date(), Validators.required],
            amount:       [a.amount, Validators.required],
        });
    }

    override ngOnInit() {
        this.paymentLookup.onObjectSelected = p => this.checkAmount.set(p.amount||0);
        this.#parentId = this.entitySrv.getParentId();
        if (this.#parentId) {
            super.ngOnInit();
        } else {
            this.router.navigate(['..'], { relativeTo: this.route }).then();
        }
    }

    ngOnDestroy() {
        this.entitySrv.isEditInProgress = false;
    }

}
