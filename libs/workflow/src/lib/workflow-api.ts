export const DOC_STATUS_URL = '/doc-status';
export const MESSAGES_URL  = '/messages';
export const DOCUMENT_URL  = '/documents';
export const MAILBOX_URL  = '/mailbox';
export const USER_URL  = '/users';
export const INBOX_URL  = '/workflow/inbox';


export interface DocStatus {
    id: number;
    description: string;
    msgLevel: number;
    isFinal: boolean;
}

export interface MailBox {
    id: number
    centerId: number;
    messageId: number;
    senderId: number;
    receiverId: number;
    timeStamp: Date;
    transacId?: number;
    payOrderId?: number;
    assetRecepId?: number;
    assetAppointmentId?: number;
    holidayRequestId?: number;
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
    messageDescription?: string;
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
