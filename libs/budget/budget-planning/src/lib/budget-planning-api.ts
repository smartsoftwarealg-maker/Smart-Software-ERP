export const BUDGET_PLANNING_URL = '/plannings';
export const BUDGET_URL = '/budgets/budgets';


export interface BudgetPlanningTree {
    id: number;
    budgetId: number;
    groupId: number;
    amount: number;
    reqQty: number;
    acceptQty: number;
    acceptAmount: number;
    reqAmount: boolean;
    code?: string;
    description?: string;
    groupParentId?: number;
    children?: BudgetPlanningTree[];
}

export interface FlatBudgetPlanningTree {
    id: number;
    budgetId: number;
    groupId: number;
    amount: number;
    reqQty: number;
    acceptQty: number;
    acceptAmount: number;
    reqAmount: boolean;
    code?: string;
    description?: string;
    groupParentId?: number;
    level: number;
    expandable: boolean;
}

