import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LTMMatter} from '@ltm/ltm-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {LtmMatterService} from '@ltm/ltm-api';

import { PaginationComponent } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-matter-list',
    templateUrl: './ltm-matter-list.component.html',
    styleUrls: ['./ltm-matter-list.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule,
        TranslateDirective
    ],
})
export class LtmMatterListComponent  extends BaseEntityListComponent<LTMMatter> implements OnInit {
    // public duplicateButton: ToolbarButton = {
    //     icon: 'fa-solid fa-copy',
    //     label: 'COMMON_DUPLICATE',
    //     disabled: true,
    //     visible: true,
    //     keepOnToolbar: KeepOnToolbar.ALWAYS,
    //     click: () => this.duplicate()
    // };

    displayedColumns = [
        'id',
        'description',
        'code',
        'name'
    ];

    constructor(
        public override entitySrv: LtmMatterService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private dialog: MatDialog) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'LTM_MATTERS');
        this.pagination.pageSize = 15;
    }
}
