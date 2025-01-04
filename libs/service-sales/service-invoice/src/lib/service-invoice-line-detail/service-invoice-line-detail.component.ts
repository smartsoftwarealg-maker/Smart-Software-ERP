import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    BaseTransactionLinesDetailComponent, DOC_INVOICE
} from '@ss/logistics/api-transaction';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Service, ServiceArticleService } from '@ss/service-sales/service-articles';
import { InvoiceLinesService } from '@ss/sales/api-invoice';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-service-invoice-line-detail',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialModule,
        ReactiveFormsModule,
        TextFieldModule,
        TranslateDirective,
        UiAutoCompleteComponent
    ],
    templateUrl: './service-invoice-line-detail.component.html',
    styleUrls: ['./service-invoice-line-detail.component.css']
})
export class ServiceInvoiceLineDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    private serviceSrv = inject(ServiceArticleService);

    serviceLookup = new DefaultAutoCompleteModel(this.serviceSrv, 'reference', 'description2');

    constructor(public inventoryLinesService: InvoiceLinesService) {
        super(inventoryLinesService, DOC_INVOICE);
        this.serviceLookup.onObjectSelected = a => this.onService(a);
    }

    private onService(a: Service) {
        this.selectedReference = a?.reference;
        this.form.controls['vat'].setValue(a?.vatValue || 0);
        this.form?.controls['price'].setValue(a?.price1);
    }
}
