export const PAYMENT_ORDER_URL = '/payment-orders';
export interface PaymentOrder {
    id: number;
    bankId?: number;
    ord_number: number;
    ord_date: string;
    agent_id: number;
    center_id?: number;
    description?: string;
    invoice_number?: string;
    amount?: number;
    invoice_date?: string;
    vat?: number;
    doc_status?: number;
    user_id?: number;
    attached_docs?: string;
    requesterId?: number;
    payMode?: number;
    bankAccount?: number;
    bankAgency?: number;
    authorizationNo?: number;
    authorizationDate?: Date;
    supplierName: string;
    recordNo?: string;
    orderNumber?: string;
    orderDate?: Date;
}
