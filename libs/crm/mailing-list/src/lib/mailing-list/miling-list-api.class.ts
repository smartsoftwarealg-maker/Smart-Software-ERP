export interface MailingListLine {
    id: number;
    parentId: number,
    fullName?: string,
    email?: string,
    mobile?: string,
    isUnsubscribed: boolean,
}
