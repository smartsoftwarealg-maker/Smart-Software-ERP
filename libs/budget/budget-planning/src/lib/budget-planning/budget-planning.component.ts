import {Component, OnDestroy, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {AccountService} from '@ss/accounting/api-accounts';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService} from '@ss/common/api-common';
import {ActivatedRoute} from '@angular/router';
import {BudgetPlanningService} from '../budget-planning.service';
import {MatRadioChange} from '@angular/material/radio';
import {BudgetPlanningTree, FlatBudgetPlanningTree} from '../budget-planning-api';
import {BudgetService} from '@ss/budget/budget';
import {of, switchMap} from 'rxjs';
import {BudgetPlanningAddDlgComponent} from '../budget-planning-add-dlg/budget-planning-add-dlg.component';
import {BudgetAccountService} from '@ss/budget/budget-groups';


@Component({
    selector: 'ss-budget-planning',
    templateUrl: './budget-planning.component.html',
    styleUrls: ['./budget-planning.component.scss'],
})
export class BudgetPlanningComponent implements OnInit, OnDestroy {
    private AMOUNT_COLS = ['code', 'description', 'reqAmount', 'amount', 'closingAmount', 'complement'];
    private QTY_COLS = ['code', 'description', 'reqQty', 'acceptQty'];

    private editButton: ToolbarButton = {
        icon: 'fas fa-pen',
        label: 'COMMON_EDIT_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.edit()
    };

    private currentType = 1;
    selectedPlanning: BudgetPlanningTree = null;
    displayedColumns: string[] = this.AMOUNT_COLS;

    constructor(private entitySrv: BudgetPlanningService,
                private budgetSrv: BudgetService,
                private accountSrv: AccountService,
                private budgetAccountSrv: BudgetAccountService,
                private shellSrv: ShellService,
                private dialog: MatDialog,
                private confirmationSrv: ConfirmationDialogService,
                private snackBarSrv: SnackBarService,
                private langSrv: LanguageService,
                private route: ActivatedRoute) {
    }

    private transformer = (node: BudgetPlanningTree, level: number): FlatBudgetPlanningTree => {
        return {
            id:            node.id,
            budgetId:      node.budgetId,
            groupId:       node.groupId,
            amount:        node.amount,
            closingAmount: node.closingAmount,
            complement:    node.complement,
            reqQty:        node.reqQty,
            acceptQty:     node.acceptQty,
            acceptAmount:  node.acceptAmount,
            reqAmount:     node.reqAmount,
            code:          node.code,
            description:   node.description,
            groupParentId: node.groupParentId,
            expandable: !!node.children && node.children.length > 0,
            level: level,
        };
    }

    treeControl = new FlatTreeControl<FlatBudgetPlanningTree>(
        node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
        this.transformer, node => node.level,
        node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


    hasChild = (_: number, node: FlatBudgetPlanningTree) => node.expandable;

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.shellSrv.setTitle('BUD_BUDGET_PLANNING');
        this.shellSrv.setGoBackPath('..', this.route);
        this.entitySrv.setParentId(this.budgetSrv.budget?.id || 0)
        this.shellSrv.addButton(this.editButton);
    }

    onChange(e: MatRadioChange) {
        this.currentType = +e.value === 1? 1 : -1;
        this.refresh(e.value);
    }

    onMode(e: MatRadioChange) {
        this.displayedColumns = +e.value === 1? this.AMOUNT_COLS : this.QTY_COLS;
        this.refresh(this.currentType);
    }

    private refresh(sign: number) {
        this.entitySrv
            .tree(sign)
            .subscribe(res => this.dataSource.data = res);
    }

    select(node: BudgetPlanningTree) {
        this.selectedPlanning = node;
        this.editButton.disabled = node.children?.length > 0;
    }

    private edit() {
        if (!this.editButton.disabled) {
            const dialogRef = this.dialog.open(BudgetPlanningAddDlgComponent, {
                width: '500px',
                height: '450px',
                disableClose: true,
                data: this.selectedPlanning
            });

            dialogRef
                .afterClosed()
                .pipe(switchMap(res => res? this.entitySrv.save(res) : of(null)))
                .subscribe(res => {
                    if (res) {
                        this.snackBarSrv.showSuccessMessage();
                        this.refresh(this.currentType);
                    }
                });
        }
    }
}
