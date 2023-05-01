import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_BUDGET_BUDGET_URL,
    ABS_BUDGET_COMMITMENT_URL,
    ABS_BUDGET_DASHBOARD_URL,
    ABS_BUDGET_GROUP_URL,
    ABS_BUDGET_PLANNING_URL,
    ABS_BUDGET_REPORTS_URL,
    ABS_BUDGET_TRANSFER_URL,
    ABS_HR_REPORTS_URL,
    ABS_STOCK_DASHBOARD_URL
} from '../common';

export const budgetNavTree: SideNavNode = {
    name: 'BUDGET-APP',
    icon: 'fa-solid fa-money-bill-wheat',
    accessRights: 'BUDGET-APP',
    children: [
        {
            name: 'BUD_BUDGETS',
            icon: 'fa-solid fa-laptop-file',
            route: ABS_BUDGET_BUDGET_URL,
            accessRights: 'Budget'
        },
        {
            name: 'BUD_BUDGET_GROUPS',
            icon: 'fa-solid fa-laptop-file',
            route: ABS_BUDGET_GROUP_URL,
            accessRights: 'BudgetGroup'
        },
        {
            name: 'BUD_BUDGET_PLANNING',
            icon: 'fa-solid fa-ruler-triangle',
            route: ABS_BUDGET_PLANNING_URL,
            accessRights: 'BudgetPlanning'
        },
        {
            name: 'BUD_COMMITMENTS',
            icon: 'fa-solid fa-file-lock',
            route: ABS_BUDGET_COMMITMENT_URL,
            accessRights: 'BudgetCommitment'
        },
        {
            name: 'BUD_TRANSFERS',
            icon: 'fa-solid fa-money-bill-transfer',
            route: ABS_BUDGET_TRANSFER_URL,
            accessRights: 'BudgetCommitment'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_BUDGET_REPORTS_URL,
            accessRights: 'Report'
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_BUDGET_DASHBOARD_URL,
            accessRights: 'DASHBOARD'
        },
    ]
};
