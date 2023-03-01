import { Routes } from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {
    BUDGET_BUDGET_URL,
    BUDGET_COMMITMENT_URL,
    BUDGET_GROUP_URL,
    BUDGET_PLANNING_URL,
    BUDGET_SELECTOR_URL
} from '../common';
import {
    BudgetDetailComponent,
    BudgetListComponent,
    BudgetSelectorDlgComponent,
    BudgetSelectorGuardGuard
} from '@ss/budget/budget';
import {BudgetGroupsComponent} from '@ss/budget/budget-groups';
import {BudgetPlanningComponent} from '@ss/budget/budget-planning';
import {
    BudgetCommitmentDetailComponent,
    BudgetCommitmentListComponent
} from '@ss/budget/budget-movements';

export const budgetRoutes: Routes = [
    {
        path: BUDGET_BUDGET_URL,
        children: [
            {
                path: LIST_URL,
                component: BudgetListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: BudgetDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService, BudgetSelectorGuardGuard]
            },
            {
                path: ':id',
                component: BudgetCommitmentDetailComponent,
                canActivate: [CanActivateService, BudgetSelectorGuardGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    { path: BUDGET_GROUP_URL, component: BudgetGroupsComponent, canActivate: [CanActivateService] },
    { path: BUDGET_PLANNING_URL, component: BudgetPlanningComponent, canActivate: [CanActivateService, BudgetSelectorGuardGuard] },
    { path: BUDGET_SELECTOR_URL, component: BudgetSelectorDlgComponent, canActivate: [CanActivateService] },

    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];

