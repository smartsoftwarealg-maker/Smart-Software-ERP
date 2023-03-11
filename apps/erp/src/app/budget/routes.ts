import { Routes } from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {
    BUDGET_BUDGET_URL,
    BUDGET_COMMITMENT_URL,
    BUDGET_GROUP_URL,
    BUDGET_PLANNING_URL,
    BUDGET_SELECTOR_URL, BUDGET_TRANSFER_URL
} from '../common';
import {
    BudgetDetailComponent,
    BudgetListComponent,
    BudgetSelectorDlgComponent,
    BudgetSelectorGuard
} from '@ss/budget/budget';
import {BudgetGroupsComponent} from '@ss/budget/budget-groups';
import {BudgetPlanningComponent} from '@ss/budget/budget-planning';
import {
    BudgetCommitmentDetailComponent,
    BudgetCommitmentListComponent,
    BudgetTransferDetailComponent, BudgetTransferLineDetailComponent,
    BudgetTransferLineListComponent,
    BudgetTransferListComponent
} from '@ss/budget/budget-movements';
import {budgetGuard, loginGuard} from '../erp-guards';

export const budgetRoutes: Routes = [
    {
        path: BUDGET_BUDGET_URL,
        children: [
            {
                path: LIST_URL,
                component: BudgetListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: BudgetDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: BUDGET_COMMITMENT_URL,
        children: [
            {
                path: LIST_URL,
                component: BudgetCommitmentListComponent,
                canActivate: [CanActivateService, budgetGuard]
            },
            {
                path: ':id',
                component: BudgetCommitmentDetailComponent,
                canActivate: [CanActivateService, budgetGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: BUDGET_TRANSFER_URL,
        children: [
            {
                path: LIST_URL,
                component: BudgetTransferListComponent,
                canActivate: [CanActivateService, budgetGuard]
            },
            {
                path: ':id',
                component: BudgetTransferDetailComponent,
                canActivate: [CanActivateService, BudgetSelectorGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', component: BudgetTransferLineListComponent, pathMatch: 'full'},
                    { path: 'detail',
                        children: [
                            { path: ':id', component: BudgetTransferLineDetailComponent }
                        ]
                    }
                ]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    { path: BUDGET_GROUP_URL, component: BudgetGroupsComponent, canActivate: [loginGuard] },
    { path: BUDGET_PLANNING_URL, component: BudgetPlanningComponent, canActivate: [CanActivateService, BudgetSelectorGuard] },
    { path: BUDGET_SELECTOR_URL, component: BudgetSelectorDlgComponent, canActivate: [loginGuard] },

    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];

