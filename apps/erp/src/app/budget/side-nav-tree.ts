import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_BUDGET_BUDGET_URL,
    ABS_BUDGET_COMMITMENT_URL,
    ABS_BUDGET_GROUP_URL,
    ABS_BUDGET_PLANNING_URL, ABS_BUDGET_TRANSFER_URL
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
            icon: 'fa-sharp fa-solid fa-ruler-triangle',
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
    ]
};
