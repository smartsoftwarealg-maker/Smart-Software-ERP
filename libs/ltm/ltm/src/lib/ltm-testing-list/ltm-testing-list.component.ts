import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseEntityListComponent } from "@ss/common/ui-base-entity";
import { LTMLine, LTMTesting } from "../ltm-api";
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from "@ss/common/ui-shell";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultReportService } from "@ss/common/ui-default-report-component";
import { dateToStr, MaterialModule, PaginatorPersistenceService, ymdToDmy } from '@ss/common/api-common';
import { LtmTestingService } from '../services/ltm-testing.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { LtmLineService } from '../services/ltm-line.service';
import { MatDialog } from '@angular/material/dialog';
import { LtmInjectionComponent } from '../ltm-injection/ltm-injection.component';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { LtmMatterService } from '../services/ltm-matter.service';
import { LtmBaseTestingListComponent } from '../ltm-testing-common/ltm-base-testing-list.component';

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
        LogisticsUiDocInfoModule,
        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ]
})

export class LtmTestingListComponent extends LtmBaseTestingListComponent {
    displayedColumns = ['matterDescription', 'timeStamp', 'pickupDescription', 'siloDescription'];

    constructor(
        public override entitySrv: LtmTestingService,
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
            'LTM_TESTINGS');
    }
}
