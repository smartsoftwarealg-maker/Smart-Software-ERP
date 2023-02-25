import {SideNavNode} from '@ss/common/api-common';
import {ABS_BUDGET_BUDGET_URL, ABS_BUDGET_GROUP_URL, ABS_BUDGET_PLANNING_URL} from '../common';

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
            accessRights: 'Budget'
        },
        {
            name: 'BUD_BUDGET_PLANNING',
            icon: 'fa-sharp fa-solid fa-ruler-triangle',
            route: ABS_BUDGET_PLANNING_URL,
            accessRights: 'Budget'
        },
    ]
};
