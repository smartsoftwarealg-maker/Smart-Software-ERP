export const CONSUMPTION_LINES_URL = "/detail";

export interface ConsumptionLines {
    id: number;
    transacId: number;
    reference: string;
    sourceDoc: number;
    store: number;
    qtyOrdered: number;
    qtySatisfied: number;
    qtyInvoiced: number;
    qtyReturned: number;
    price: number;
    observation: string;
    footerMemo: string;
    position: number;
    pprice: number;
}

