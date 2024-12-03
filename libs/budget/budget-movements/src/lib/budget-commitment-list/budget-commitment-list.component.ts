import {Component, OnInit} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {BudgetCommitment} from '../budget-movement-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel, PaginatorPersistenceService} from '@ss/common/api-common';
import {BudgetCommitmentService} from '../budget-commitment.service';
import {BudgetPlanningService, BudgetPlanningTree} from '@ss/budget/budget-planning';
import {BudgetService} from '@ss/budget/budget';
import { MatList, MatListItem } from '@angular/material/list';
import { NgFor, DecimalPipe } from '@angular/common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';

@Component({
    selector: 'ss-budget-commitment-list',
    templateUrl: './budget-commitment-list.component.html',
    styleUrls: ['./budget-commitment-list.component.scss'],
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
    ],
})
export class BudgetCommitmentListComponent extends BaseEntityListComponent<BudgetCommitment> implements OnInit {
    selectedPlanningId = 0;
    planningPaginator = PaginationModel.newInstance({ page: 0, pageSize: 10, elementCount: 0});
    plannings: BudgetPlanningTree[] = [];
    displayedColumns = [
        'decision',
        'description',
        'orderNo',
        'supplierName',
        'amount'
    ];

    constructor(
        public override entitySrv: BudgetCommitmentService,
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
            'BUD_COMMITMENTS');
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
