
export const PERIOD_URL = '/treasury/periods';
export const TRANSACTIONS_URL = '/treasury/transactions';


export interface TTransaction {
    id: number,
    centerId: number,
    journalId: number,
    operationDate: number,
    transacDate: string,
    reference?: string,
    reference2?: string,
    pieceno: number,
    description?: string,
    balance: number,
    userId: number,
    paymode: number,
    bankExpenses: boolean,
    treasuryGroup: number,
    groupName?: string;
    memo?: string,
    agent?: number;
    agentName?: string;
}

export interface TTransactionLine {
    id: number,
    transacId: number,
    invoiceNo?: string,
    supplier?: string,
    description?: string,
    amount: number,
    vat: number,
    invoiceDate: string
}

export interface Summary{journal: string, period: number, balance: number, rTotal: number}
