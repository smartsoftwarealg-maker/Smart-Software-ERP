import { Component } from "@angular/core";
import { MaterialModule } from "@ss/common/api-common";
import { RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule } from "@ss/common/ui-confirmation-dialog";
import { LTMMixtureDetail } from "../ltm-api";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { BaseChildEntityListComponent } from "@ss/common/ui-base-entity";
import { LtmMixtureDetailService } from "../services/ltm-mixture-detail.service";

@Component({
    selector: 'ss-ltm-matter-test-list',
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
        LogisticsUiDocInfoModule,
        AppArchiveModule,
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
