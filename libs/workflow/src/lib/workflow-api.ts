export const DOC_STATUS_URL = '/doc-status';
export const MESSAGES_URL  = '/messages';
export const RECEIVED_MESSAGES_URL  = '/received-messages';
export const DOCUMENT_URL  = '/documents';
export const MAILBOX_URL  = '/mailbox';
export const USER_URL  = '/users';
export const INBOX_URL  = '/workflow/inbox';
export const INBOX_COUNT  = '/workflow/count';
export const CHART_TREE = '/workflow/tree/';

export const DOC_SEPARATOR_200 = 200;
export const DOC_SEPARATOR_512 = 512;
export const DOC_SEPARATOR_800 = 800;
export const FREE_INVOICE = 1;
export const PURCHASE_ORDER = 2;
export const PRICE_INQUIRY = 5;
export const QUOTATION = 6;
export const PART_REQUEST = 8;
export const PRODUCTION_ORDER = 9;
export const PURCHASE_REQUEST = 10
export const TRANSFER_ORDER = 15;
export const PICKUP = 12;
export const PRODUCTION_ORDER_DETAIL = 11;
export const MANUFACTURING = 12;
export const ORDER_INTEGRATION = 14;
export const PRODUCTION_FORMULA = 17;
export const CORRECTION_IN = 767;
export const INVENTORY = 519;
export const CORRECTION_OUT = 511;
export const DELIVERY = 257;
export const INVOICE = 258;
export const MAINT_ORDER = 261;
export const RESERVATION = 264;
export const PRODUCTION_DETAIL = 263;
export const PRODUCTION_RESERVATION = 267;
export const TRANS_ORDER_CONSUMPTION = 266;
export const TRANSFER_OUT = 259;
export const DELIVERY_CANCELLATION = 517;
export const PART_TRANSFER = 510;
export const INVOICE_CANCELLATION = 515;
export const RECEPTION = 514;
export const RECEPTION_CANCELLATION = 262;
export const PRODUCTION = 518;
export const RESERVATION_CANCELLATION = 520;
export const TRANSFER = 259;
export const TRANSFER_RECEPTION = 516;
export const SUPP_QUOTATION = 4;
export const SALES_ORDER = 1025;
export const TRANSFER_CANCELLATION = 513;
export const CONSUMPTION_CANCELLATION = 521;
export const QUALITY_CONTROL = 270;
export const PRODUCTION_RECEPTION = 271;
export const QUALITY_CONTROL2 = 272;
export const TRANSFER_IN = 524;
export const EXTRA_COSTS = 530;
export const ASSET_RECEPTION = 531;
export const CONSUMPTION = 260;
export const AUTO_DELIVERY = 268;
export const STORE_TRANSFER_OUT = 269;
export const IMPORT_RECEPTION = 514;
export const ASSET_APPOINTMENT = 1010;
export const ACCOUNTING_OPR = 4096;
export const WORK_REQUEST = 12;
export const WORK_ORDER = 16;
export const PAYMENT_ORDER = 1030;
export const CMMS_WORK_ORDER = 1031;
export const HOLIDAY_REQUEST = 3000;

export interface DocStatus {
    id: number;
    description: string;
    msgLevel: number;
    isFinal: boolean;
    isPostFinal: boolean;
}

export interface MailBox {
    id: number
    centerId: number;
    messageId: number;
    senderId: number;
    receiverId: number;
    timeStamp: Date;
    documentId: number;
    transacId?: number;
    senderName?: string;
    receiverName?: string;
    message?: string;
    canceled: boolean;
}

export interface UserMessage {
    id: number;
    userId: number;
    messageId: number;
    amount: number;
    isPostFinal: boolean;
    messageDescription?: string;
    userName?: string;
}

export interface UserDocument {
    id: number;
    userId: number;
    documentId: number;
    documentDescription?: string;
}

export interface Inbox {
    id: number;
    message: string;
    time: Date;
    sender: string;
    document: string;
    number: Date
    date: Date,
    creator: string;
    docStatus: string;
    documentId: number;
    targetId: number;
}

export interface WorkflowChartNode {
    id: number;
    parentId: number; //appId
    parentMsg?: number;
    childMsg:          number,
    isFinal: boolean;
    parentDescription?: string,
    childDescription?: string;
}

export interface WorkflowChartTree {
    message: WorkflowChartNode;
    children: WorkflowChartTree[];
}
