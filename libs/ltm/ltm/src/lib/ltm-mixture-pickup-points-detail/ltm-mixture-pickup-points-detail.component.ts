import { Component, inject } from '@angular/core';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule } from "@ss/common/ui-confirmation-dialog";
import {
    LTMMixturePickupPoint
} from '@ltm/ltm-api';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";

import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { BaseChildEntityDetailComponent } from "@ss/common/ui-base-entity";
import { LtmMixturePickupPointService } from '@ltm/ltm-api';
import { LtmPickupPointService } from '@ltm/ltm-api';

@Component({
    selector: 'ss-ltm-mixture-pp-detail',
    templateUrl: './ltm-mixture-pickup-points-detail.component.html',
    styleUrls: ['../line-matter-detail/line-matter-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
})
export class LtmMixturePickupPointsDetailComponent extends BaseChildEntityDetailComponent<LTMMixturePickupPoint> {
    private pickupPointSrv = inject(LtmPickupPointService);
    private fb = inject(FormBuilder);

    pickupPointLookup = new DefaultAutoCompleteModel(this.pickupPointSrv);

    constructor(protected override entitySrv: LtmMixturePickupPointService) {
        super(entitySrv, 'LTMMixtureDetail');
    }

    setupForm(e: LTMMixturePickupPoint): UntypedFormGroup {
        return this.fb.group({
            id:          [e.id],
            parentId:    [e.parentId || this.entitySrv.getParentId()],
            pickupPoint: [e.pickupPoint],
        });
    }
}
