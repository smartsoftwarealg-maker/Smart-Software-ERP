export const EXCHANGE_DEPOSIT_URL = '/deposits';
export const EXCHANGE_GBALANCE_URL = '/exchanges/gbalance?id=0';

export interface Deposit {
    id: number;
    customerId: number;
    excDate: Date;
    depositType: number;
    description?: string;
    currencyId: number;
    amount: number;
    userId: number;
    centerId: number;
    soldCurrencyId?: number;
    exchangeRate?:number;
    creationTime: string;
    denomination?: string;
    customerCode?: string;
    commission?: number;
    typeDescription?: string;
    currencyDescription?: string;
    soldCurrencyDescription?: string;
    sourceId?: number;
    isTransfer?: boolean
}

export interface History {
    excDate: Date;
    customer?: string;
    excType?: string;
    description?: string;
    currency?: string;
    debit: number;
    credit: number
    creationDate?: string;
}

export interface Commission {
    description: string;
    currency: string;
    withdrawal: number;
    commission: number;
    rate: number;
}

export interface Balance {
    currency: string;
    debit:    number;
    credit:   number;
}

export interface CBalance {
    currency: string;
    amount:    number;
}

export interface GBalance {
    code?: string;
    denomination?: string;
    currency: string;
    amount:    number;
    id: number;
}
