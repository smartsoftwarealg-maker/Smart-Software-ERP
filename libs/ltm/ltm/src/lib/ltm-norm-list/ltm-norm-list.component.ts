import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import {LtmMatterService} from '../services/ltm-matter.service';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { ReactiveFormsModule } from "@angular/forms";

import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { Lookup } from '@ss/common/api-lookup';
import { LTMSiloService } from '../services/ltm-silo.service';
import { LtmNormService } from '../services/ltm-norm.service';

@Component({
    selector: 'ss-ltm-norm-list',
    templateUrl: './ltm-norm-list.component.html',
    styleUrls: ['./ltm-norm-list.component.scss'],
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
    ],
})
export class LtmNormListComponent extends BaseEntityListComponent<Lookup> implements OnInit {

    displayedColumns = [
        'description',
    ];

    constructor(
        public override entitySrv: LtmNormService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'LTM_NORMS');
        this.pagination.pageSize = 15;
    }
}
