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


import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { Lookup } from '@ss/common/api-lookup';
import { LTMSiloService } from '../services/ltm-silo.service';
import { LtmNormService } from '../services/ltm-norm.service';
import { LtmNormTreeService } from '../services/ltm-norm-tree.service';
import { NormTree } from '../ltm-api';

@Component({
    selector: 'ss-ltm-norm-tree',
    templateUrl: './ltm-norm-tree.component.html',
    styleUrls: ['./ltm-norm-tree.component.scss'],
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
export class LtmNormTreeComponent extends BaseEntityListComponent<NormTree> implements OnInit {

    displayedColumns = [
        'matter',
    ];

    constructor(
        public override entitySrv: LtmNormTreeService,
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
            'LTM_TEST_NORMS');
        this.pagination.pageSize = 15;
    }

    override ngOnInit() {
        this.deleteButton.visible = false;
        this.addButton.visible = false;
        super.ngOnInit();
    }

    toggle(e: NormTree) {
        e.expanded = !e.expanded;
    }
}
