export const DEBTS_URL = '/debts';

export interface AgentDebts {
    document?: string;
    id: number;
    totalDebit: number;
    totalCredit: number;
    debit: number;
    credit: number;
}


