import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";

import { ReactiveFormsModule } from "@angular/forms";
import { Lookup } from '@ss/common/api-lookup';
import { LTMSiloService } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';

@Component({
    selector: 'ss-ltm-silo-list',
    templateUrl: './ltm-silo-list.component.html',
    styleUrls: ['./ltm-silo-list.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    PaginationComponent,
    ReactiveFormsModule,
    TranslateDirective
],
})
export class LtmSiloListComponent extends BaseEntityListComponent<Lookup> implements OnInit {

    displayedColumns = [
        'description',
    ];

    constructor(
        public override entitySrv: LTMSiloService,
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
            'LTM_SILOS');
        this.pagination.pageSize = 15;
    }
}
