export const BUDGET_URL = '/budgets/budgets';

export interface Budget {
    id: number;
    description: string;
    status?: number;
}
