export const ACCOUNT_CLASSES_URL = '/accounting/classes'

export interface SodismacSupplierAccount {
    id: number;
    parentId: number;
    categoryId: number;
    accountId: number;
    categoryDescription?: string;
    accountDescription?: string;
}
