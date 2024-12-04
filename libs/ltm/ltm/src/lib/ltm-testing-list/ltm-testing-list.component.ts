import { Component } from '@angular/core';
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router } from "@angular/router";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultReportService } from "@ss/common/ui-default-report-component";
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { LtmTestingService } from '@ltm/ltm-api';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { LtmBaseTestingListComponent } from '../ltm-testing-common/ltm-base-testing-list.component';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: "ss-ltm-testing-list",
    templateUrl: "../ltm-testing-common/ltm-testing-list.component.html",
    styleUrls: ["../ltm-testing-common/ltm-testing-list.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        PaginationComponent,
        ReactiveFormsModule,
        DatePickerComponent,
        UiAutoCompleteComponent
    ]
})

export class LtmTestingListComponent extends LtmBaseTestingListComponent {
    displayedColumns = ['matterDescription', 'timeStamp', 'equipmentDescription', 'pickupDescription', 'siloDescription'];
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
