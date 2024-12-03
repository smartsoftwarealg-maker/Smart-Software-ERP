import { Component } from '@angular/core';
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router } from "@angular/router";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultReportService } from "@ss/common/ui-default-report-component";
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { LtmBaseTestingListComponent } from '../ltm-testing-common/ltm-base-testing-list.component';
import { LtmRmTestingService } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: "ss-ltm-rm-testing-list",
    templateUrl: "../ltm-testing-common/ltm-testing-list.component.html",
    styleUrls: ["../ltm-testing-common/ltm-testing-list.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule,
        DatePickerComponent,
        TranslateDirective,
        UiAutoCompleteComponent
    ]
})

export class LtmRmTestingListComponent extends LtmBaseTestingListComponent {
    displayedColumns = ['matterDescription', 'timeStamp',  'pickupDescription'];
    constructor(
        public override entitySrv: LtmRmTestingService,
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
            'LTM_RAW_TESTINGS');
    }
}
