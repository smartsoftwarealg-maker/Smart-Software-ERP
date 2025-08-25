import { Component, inject } from '@angular/core';

import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { LtmEquipmentTestService } from '../services/ltm-equipment-test.service';
import { MatTooltip } from '@angular/material/tooltip';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatMiniFabButton } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { LTMTestEquipmentTest, LtmTestService } from '@ltm/ltm-api';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-test-equipment-test-detail',
    standalone: true,
    imports: [
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
    templateUrl: './test-equipment-test-detail.component.html',
    styleUrl: './test-equipment-test-detail.component.scss'
})
export class TestEquipmentTestDetailComponent extends BaseChildEntityDetailComponent<LTMTestEquipmentTest> {
    #fb = inject(FormBuilder);
    #testSrv = inject(LtmTestService);

    testLookup = new DefaultAutoCompleteModel(this.#testSrv);

    constructor(public override entitySrv: LtmEquipmentTestService) {
        super(entitySrv, 'LTMTestEquipmentTest');
    }

    override setupForm(b: LTMTestEquipmentTest): UntypedFormGroup {
        return this.#fb.group({
            id:       [b.id],
            testId:   [b.testId, Validators.required],
            parentId: [b.parentId||this.entitySrv.getParentId(), Validators.required]
        })
    }
}
