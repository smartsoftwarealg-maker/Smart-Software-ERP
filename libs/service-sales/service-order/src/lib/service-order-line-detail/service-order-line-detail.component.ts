import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { BaseTransactionLinesDetailComponent, DOC_SALES_ORDER, OfferLinesService } from '@ss/logistics/api-transaction';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Service, ServiceArticleService } from '@ss/service-sales/service-articles';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-service-order-line-detail',
    standalone: true,
    imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MaterialModule, ReactiveFormsModule, TextFieldModule, UiAutoCompleteComponent, TranslateDirective],
    templateUrl: './service-order-line-detail.component.html',
    styleUrls: ['./service-order-line-detail.component.css']
})
export class ServiceOrderLineDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    private serviceSrv = inject(ServiceArticleService);

    serviceLookup = new DefaultAutoCompleteModel(this.serviceSrv, 'reference', 'description2');

    constructor(public inventoryLinesService: OfferLinesService) {
        super(inventoryLinesService, DOC_SALES_ORDER);
        this.serviceLookup.onObjectSelected = a => this.onService(a);
    }

    private onService(a: Service) {
        this.selectedReference = a?.reference;
        this.form.controls['vat'].setValue(a?.vatValue || 0);
    }
}
