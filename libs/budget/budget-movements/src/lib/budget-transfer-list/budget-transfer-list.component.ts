import {Component, OnInit} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {BudgetCommitment, BudgetTransfer} from '../budget-movement-api';
import {PaginationModel, PaginatorPersistenceService} from '@ss/common/api-common';
import {BudgetPlanningService, BudgetPlanningTree} from '@ss/budget/budget-planning';
import {BudgetCommitmentService} from '../budget-commitment.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {BudgetService} from '@ss/budget/budget';
import {BudgetTransferService} from '../budget-transfer.service';
import { MatList, MatListItem } from '@angular/material/list';
import { NgFor, DecimalPipe, DatePipe } from '@angular/common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';

@Component({
    selector: 'ss-budget-transfer-list',
    templateUrl: './budget-transfer-list.component.html',
    styleUrls: ['./budget-transfer-list.component.scss'],
    standalone: true,
    imports: [
        MatList,
        NgFor,
        MatListItem,
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DecimalPipe,
        DatePipe,
    ],
})
export class BudgetTransferListComponent extends BaseEntityListComponent<BudgetTransfer> implements OnInit {
    selectedPlanningId = 0;
    planningPaginator = PaginationModel.newInstance({ page: 0, pageSize: 10, elementCount: 0});
    plannings: BudgetPlanningTree[] = [];
    displayedColumns = [
        'decisionInfo',
        'transferDate',
        'description',
        'amount'
    ];

    constructor(
        public override entitySrv: BudgetTransferService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private planningSrv: BudgetPlanningService,
        private budgetSrv: BudgetService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'BUD_TRANSFERS');
        this.pagination.pageSize = 10;
        this.planningSrv.setParentId(this.budgetSrv.budget?.id || 0);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.planningSrv
            .getList(0, 1000)
            .subscribe(res => this.plannings = res.body.filter(p => !p.children));
    }

    onPlanning(p: BudgetPlanningTree) {
        this.selectedPlanningId = p?.id || 0;
        this.entitySrv.setParentId(this.selectedPlanningId);
        this.refresh();
    }
}
