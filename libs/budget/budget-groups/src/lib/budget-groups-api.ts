export const BUDGET_GROUP_URL = '/budgets/groups';
export const BUDGET_ACCOUNTS  = '/accounts';

export interface BudgetGroupTree {
    id: number;
    parentId?: number;
    description: string;
    accountType: number;
    disabled: boolean;
    code?: string;
    children?: BudgetGroupTree[];
}

export interface BudgetAccount {
    id: number;
    groupId: number;
    accountNo: string;
    balanceType: number;
    balanceSign: number;
    accountDescription?: string;
}
