export const DOC_STATUS_URL = '/doc-status';
export const MESSAGES_URL  = '/messages';
export const DOCUMENT_URL  = '/documents';
export const MAILBOX_URL  = '/mailbox';
export const USER_URL  = '/users';


export interface DocStatus {
    id: number;
    description: String;
    msgLevel: number;
    isFinal: boolean;
}

export interface MailBox {
    id: number
    centerId: number;
    messageId: number;
    senderId: number;
    timeStamp: Date;
    transacId?: number;
    payOrderId?: number;
    assetRecepId?: number;
    senderName?: string;
    message?: string;
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
