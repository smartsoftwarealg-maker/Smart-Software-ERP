import { Component } from "@angular/core";
import { MaterialModule } from "@ss/common/api-common";
import { RouterOutlet } from "@angular/router";
import { LTMMixtureDetail } from '@ltm/ltm-api';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";




import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { BaseChildEntityListComponent } from "@ss/common/ui-base-entity";
import { LtmMixtureDetailService } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-mixture-detai-list',
    templateUrl: './ltm-mixture-detail-list.component.html',
    styleUrls: ['./ltm-mixture-detail-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule,
        TranslatePipe
    ]
})
export class LtmMixtureDetailListComponent extends BaseChildEntityListComponent<LTMMixtureDetail> {
    override displayedColumns = ['matterDescription'];

    constructor(protected override detailSrv: LtmMixtureDetailService) {
        super(detailSrv, 'LTMMixtureDetail');
    }
}
