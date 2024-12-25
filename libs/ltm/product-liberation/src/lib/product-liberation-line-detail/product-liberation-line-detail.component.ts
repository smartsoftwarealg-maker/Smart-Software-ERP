import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { MatTooltip } from '@angular/material/tooltip';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatMiniFabButton } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import {
    LtmCenterMatterService,
    LtmLineMatterLookup,
    LtmLineMatterService,
    LTMProductLiberationLine,
    LtmProductLiberationLineService,
    LtmProductService, LtmProductTypeService, LTMSiloService,
    LtmTestService
} from '@ltm/ltm-api';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-test-equipment-test-detail',
    standalone: true,
    imports: [
        CommonModule,
        MatTooltip,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatFormField,
        MatLabel,
        MatMiniFabButton,
        MaterialModule,
        ReactiveFormsModule,
        TranslatePipe,
        TranslateDirective,
        UiAutoCompleteComponent
    ],
    templateUrl: './product-liberation-line-detail.component.html',
    styleUrl: './product-liberation-line-detail.component.scss'
})
export class ProductLiberationLineDetailComponent extends BaseChildEntityDetailComponent<LTMProductLiberationLine> {
    #matterSrv =  inject(LtmCenterMatterService);
    #fb = inject(FormBuilder);
    #productSrv = inject(LtmProductService);
    #siloSrv = inject(LTMSiloService);
    #productTypeSrv = inject(LtmProductTypeService);

    siloLookup = new DefaultAutoCompleteModel(this.#siloSrv);
    productTypeLookup = new DefaultAutoCompleteModel(this.#productTypeSrv);
    matterLookup = new DefaultAutoCompleteModel(this.#matterSrv);

    constructor(public override entitySrv: LtmProductLiberationLineService) {
        super(entitySrv, 'LTMProductLiberationLine');
    }

    override setupForm(b: LTMProductLiberationLine): UntypedFormGroup {
        return this.#fb.group({
            id:       [b.id],
            parentId: [b.parentId||this.entitySrv.getParentId(), Validators.required],
            siloId: [b.siloId, Validators.required],
            typeId: [b.typeId, Validators.required],
            productId: [b.productId, Validators.required]
        })
    }
}
