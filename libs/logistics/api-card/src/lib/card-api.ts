export const CARD_URL = '/card';

export interface Card {
    document: string,
    number:   number,
    date:     Date,
    qtyIn:    number,
    qtyOut:   number,
    price:    number,
    stock:    number,
    value:    number
}

