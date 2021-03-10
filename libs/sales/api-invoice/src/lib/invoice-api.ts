export const ORDER_URL = "/sales-order";

export interface Order {
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

