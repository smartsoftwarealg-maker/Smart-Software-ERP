import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";

import { ReactiveFormsModule } from "@angular/forms";
import { Lookup } from '@ss/common/api-lookup';
import { LtmNormService } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-norm-list',
    templateUrl: './ltm-norm-list.component.html',
    styleUrls: ['./ltm-norm-list.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    PaginationComponent,
    ReactiveFormsModule
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
