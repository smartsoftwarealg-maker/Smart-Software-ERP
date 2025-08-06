import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import {MaterialModule, PaginatorPersistenceService} from '@ss/common/api-common';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import {SalesCategory} from "../category-accounts.api";
import {CategoryAccountsService} from "../category-accounts.service";

@Component({
    selector: 'ss-category-account-list',
    templateUrl: './category-accounts-list.component.html',
    styleUrl: './category-accounts-list.component.scss',
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        PaginationComponent,
    ],
})
export class CategoryAccountsListComponent extends BaseEntityListComponent<SalesCategory> {
    displayedColumns = ['description', 'cashAccount', 'deferredAccounts'];

    constructor(
        public listSrv: CategoryAccountsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            listSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ACC_CATEGORY_ACCOUNTS',
        );
        this.pagination.pageSize = 15;
    }
}
