
export const PERIOD_URL = '/treasury/periods';
export const TRANSACTIONS_URL = '/treasury/transactions';
export const DETAIL_URL = '/detail';


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
    dueDays: number;
    costCenter?: number;
    costCenterDescription?: string;
}

export interface TTransactionLine {
    id: number,
    transacId: number,
    invoiceNo?: string,
    description?: string,
    amount: number,
    vat: number,
    invoiceDate?: Date
}

export interface TImport{
    journal: number;
    date: Date;
    from: Date;
    to: Date;
    consolidated: boolean;
}

export interface Summary{journal: string, period: number, balance: number, rTotal: number}
