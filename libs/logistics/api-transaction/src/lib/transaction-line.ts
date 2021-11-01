export interface TransactionLine {
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
    vat: number;
    observation: string;
    footerMemo: string;
    position: number;
    pprice: number;
    storeName?: string;
    refDescription?: string;
}
