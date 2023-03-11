export const BUDGET_COMMITMENTS = '/commitments';
export const BUDGET_TRANSFERS   = '/transfers';
export const BUDGET_DETAIL      = '/detail';
export const BUDGET_PLANNINGS   = '/budgets/plannings';

export interface BudgetCommitment {
    id: number;
    parentId: number;
    date: Date;
    decision?: string;
    description: string,
    amount: number;
    orderNo: string;
    supplier?: number;
    supplierName?: string;
}

export interface BudgetTransfer {
    id: number;
    budgetId: number;
    transferDate: Date;
    description?: string;
    decisionInfo?: string;
    planningId: number;
    amount: number;
    userId: number;
}

export interface BudgetTransferDetail {
    id: number;
    transferId: number;
    planningId: number;
    amount: number;
    description?: string;
}

export interface PlanningInfo {
    amount: number;
    complement: number;
    commitment: number;
    transfer: number;
    balance: number;
}

