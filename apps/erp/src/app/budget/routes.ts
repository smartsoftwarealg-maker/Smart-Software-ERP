import { Routes } from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {BUDGET_BUDGET_URL, BUDGET_GROUP_URL} from '../common';
import {BudgetDetailComponent, BudgetListComponent} from '@ss/budget/budget';
import {BudgetGroupsComponent} from '@ss/budget/budget-groups';

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
    { path: BUDGET_GROUP_URL, component: BudgetGroupsComponent, canActivate: [CanActivateService] },

    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];

