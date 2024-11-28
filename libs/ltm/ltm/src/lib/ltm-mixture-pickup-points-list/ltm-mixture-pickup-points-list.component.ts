import { Component } from "@angular/core";
import { MaterialModule } from "@ss/common/api-common";
import { RouterOutlet } from "@angular/router";
import { LTMMixturePickupPoint } from '@ltm/ltm-api';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { BaseChildEntityListComponent } from "@ss/common/ui-base-entity";
import { LtmMixturePickupPointService } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-mixture-pp-test-list',
    templateUrl: './ltm-mixture-pickup-points-list.component.html',
    styleUrls: ['./ltm-mixture-pickup-points-list.component.scss'],
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
export class LtmMixturePickupPointsListComponent extends BaseChildEntityListComponent<LTMMixturePickupPoint> {
    override displayedColumns = ['matterDescription'];

    constructor(protected override detailSrv: LtmMixturePickupPointService) {
        super(detailSrv, 'LTMMixturePickupPoint');
    }
}
