export const INVOICE_CANCELLATION_URL = '/cinvoice';

export interface CInvoice {
    id: number;
    center: number;
    document: number;
    number: number;
    date: string;
    agent: number;
    userID: number;
    dealer: number;
    header: string;
    footer: string;
    reference: string;
    referenceDocDate: string;
    locked: string;
    creationTime: string;
}

