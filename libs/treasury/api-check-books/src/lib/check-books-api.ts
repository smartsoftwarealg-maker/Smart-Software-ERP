
export const CHECK_BOOK_URL = '/treasury/checks-books';

export interface CheckBook {
    id: number;
    centerId: number;
    bankId: number;
    bookYear: number;
    fromNumber: number;
    toNumber: number;
    bankName?: string;
}
