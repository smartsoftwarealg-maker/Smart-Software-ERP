import { Component, inject, OnInit } from '@angular/core';

import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MissionElementPricing } from '../mission-elements-api.class';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { MissionsElementPricingService } from '../mission-elementPricing.service';
import { ZoneService } from '../../../../missions/src/lib/transport.service';
import { CategoryService } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-mission-elements-lines-detail',
    imports: [
    MaterialModule,
    TranslateDirective,
    TranslatePipe,
    UiAutoCompleteComponent
],
    templateUrl: './mission-elements-lines-detail.component.html',
    styleUrl: './mission-elements-lines-detail.component.scss',
    standalone: true,
})
export class MissionElementsLinesDetailComponent
    extends BaseChildEntityDetailComponent<MissionElementPricing>
    implements OnInit
{
    private formBuilder = inject(FormBuilder);
    private zoneSrv = inject(ZoneService);
    zoneLookup = new DefaultAutoCompleteModel(this.zoneSrv);
    private categorySrv = inject(CategoryService);
    categoryLookup = new DefaultAutoCompleteModel(this.categorySrv);

    constructor(protected override entitySrv: MissionsElementPricingService) {
        super(entitySrv, 'MISSION_ELEMENT_DETAIL');
    }

    public override setupForm(b: MissionElementPricing): UntypedFormGroup {
        return this.formBuilder.group({
            id: [b.id],
            element: [b.element || 0],
            parentId: [b.parentId || this.entitySrv.getParentId()],
            theZone: [b.theZone, Validators.required],
            category: [b.category, Validators.required],
            amount: [b.amount, Validators.required],
        });
    }
}
