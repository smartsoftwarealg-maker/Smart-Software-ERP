import { Component } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';

import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';


import { ERAReport } from '@ss/accounting/accounting-api';
import {AccEraReportService} from '@ss/accounting/accounting-api';

@Component({
    selector: 'ss-era-report-list',
    templateUrl: './acc-era-report-list.component.html',
    styleUrls: ['./acc-era-report-list.component.scss'],
    standalone: true,
    imports: [
        RouterModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        PaginationComponent
    ]
})
export class EraReportListComponent extends BaseEntityListComponent<ERAReport> {
    public override addButton: ToolbarButton = {
        icon: 'fas fa-plus',
        label: 'COMMON_ADD',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.showDetail(0),
    };

    displayedColumns = [
        'description',
        'descriptionAr',
        'accountList'
    ];

    constructor(
        public override entitySrv: AccEraReportService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ACC_ERA_REPORT'
        );
        this.pagination.pageSize = 15;
    }
}
