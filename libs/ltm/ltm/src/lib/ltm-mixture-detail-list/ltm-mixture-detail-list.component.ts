import { Component } from "@angular/core";
import { MaterialModule } from "@ss/common/api-common";
import { RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule } from "@ss/common/ui-confirmation-dialog";
import { LTMMixtureDetail } from "../../../../ltm-api/src/lib/ltm-api";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";


import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { BaseChildEntityListComponent } from "@ss/common/ui-base-entity";
import { LtmMixtureDetailService } from '@ltm/ltm-api';

@Component({
    selector: 'ss-ltm-mixture-detai-list',
    templateUrl: './ltm-mixture-detail-list.component.html',
    styleUrls: ['./ltm-mixture-detail-list.component.scss'],
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
export class LtmMixtureDetailListComponent extends BaseChildEntityListComponent<LTMMixtureDetail> {
    override displayedColumns = ['matterDescription'];

    constructor(protected override detailSrv: LtmMixtureDetailService) {
        super(detailSrv, 'LTMMixtureDetail');
    }
}
