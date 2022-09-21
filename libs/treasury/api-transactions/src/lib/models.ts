
export const TRANSACTIONS_URL = '/treasury/transactions';
export const TRANSACTION_DETAIL_PARENT_URL = '/treasury/transactions/';
export const TRANSACTION_DETAIL_CHILD_URL = '/detail';


export interface TTransaction{
    id: number,
    center: number,
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
    memo?: string
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

