import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { LtmEquipmentTestService } from '../services/ltm-equipment-test.service';
import { MatTooltip } from '@angular/material/tooltip';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatMiniFabButton } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { LTMTestEquipmentTest, LtmTestService } from '@ltm/ltm-api';

@Component({
    selector: 'ss-test-equipment-test-detail',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, UiPaginationModule, MatTooltip, MatHeaderCellDef, CommonUiAutoCompleteModule, MatCard, MatCardContent, MatCardHeader, MatError, MatFormField, MatInput, MatLabel, MatMiniFabButton, MaterialModule, ReactiveFormsModule],
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
