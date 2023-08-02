import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Budget} from '../budget-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {BudgetService} from '../budget.service';

@Component({
    selector: 'ss-budget-list',
    templateUrl: './budget-list.component.html',
    styleUrls: ['./budget-list.component.scss'],
})
export class BudgetListComponent extends BaseEntityListComponent<Budget> {
    displayedColumns = [
        'description',
    ];

    constructor(
        public override entitySrv: BudgetService,
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
            'BUD_BUDGETS');
        this.pagination.pageSize = 15;
    }
}
