import { Component, inject, OnInit } from '@angular/core';
import { ExtraCostService } from '@ss/purchases/extra-costs';
import { FormBuilder, FormControl, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExtraCost } from '@ss/logistics/api-transaction';
import { ArticleAutoCompleteModel, ServiceArticleService } from '@ss/master-data/api-article';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Agent, SupplierService } from '@ss/logistics/api-agent';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'ss-extra-cost-detail',
    templateUrl: './local-extra-cost-detail.component.html',
    styleUrls: ['./local-extra-cost-detail.component.scss'],
    standalone: true,
    imports: [
        MatMiniFabButton,
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        UiAutoCompleteComponent,
        MatError,
        MatInput,
    ],
})
export class LocalExtraCostDetailComponent extends BaseChildEntityDetailComponent<ExtraCost> implements OnInit {
    private supplierSrv = inject(SupplierService);
    private serviceArticleSrv = inject(ServiceArticleService);
    private fb = inject(FormBuilder);
    private parentId= 0;

    supplierLookup= new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');
    articleLookup = new ArticleAutoCompleteModel(this.serviceArticleSrv);

    formId = 0;

    constructor(protected override entitySrv: ExtraCostService) {
        super(entitySrv, 'ExtraCost');
    }

    override setupForm(e: ExtraCost): UntypedFormGroup {
        this.id = e.id;
        return this.fb.group({
            id: new FormControl<number>(e?.id || 0),
            parentId: new FormControl<number>(e.parentId || this.parentId),
            reference: new FormControl<string>(e.reference),
            description: new FormControl<string>(e.description),
            transactDate: new FormControl<Date>(e.transactDate),
            amount: new FormControl<number>(e.amount),
            vat: new FormControl<number>(e.vat),
            agent: new FormControl<number>(e.agent || 0, Validators.required),
            invoiceNo: new FormControl<string>(e.invoiceNo),
            foreignCurrency: new FormControl<boolean>(e.foreignCurrency),
            costType: new FormControl<number>(e.costType),
            valueType: new FormControl<number>(e.valueType),
            exchangeRate: new FormControl<number>(e.exchangeRate),
            stamp: new FormControl<number|null>(e.stamp),
        });
    }
}
