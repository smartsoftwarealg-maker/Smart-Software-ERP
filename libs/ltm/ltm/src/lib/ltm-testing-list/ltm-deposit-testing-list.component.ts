import { Component } from '@angular/core';
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultReportService } from "@ss/common/ui-default-report-component";
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { LtmTestingService } from '../services/ltm-testing.service';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { ReactiveFormsModule } from '@angular/forms';

import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { LtmBaseTestingListComponent } from '../ltm-testing-common/ltm-base-testing-list.component';
import { LtmDepositTestingService } from '../services/ltm-deposit-testing.service';

@Component({
    selector: "ss-ltm-testing-list",
    templateUrl: "../ltm-testing-common/ltm-testing-list.component.html",
    styleUrls: ["../ltm-testing-common/ltm-testing-list.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,

        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ]
})

export class LtmDepositTestingListComponent extends LtmBaseTestingListComponent {
    displayedColumns = ['matterDescription', 'timeStamp', 'zoneDescription', 'depositDescription'];
    constructor(
        public override entitySrv: LtmDepositTestingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            confirmationSrv,
            defReportSrv,
            router,
            pagPersistSrv,
            'LTM_DEPOSIT_TESTINGS');
    }
}
