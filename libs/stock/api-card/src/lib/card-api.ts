export const CARD_URL = "/card";

export interface Card {
    document: string,
    number:   number,
    date:     string,
    qtyIn:    number,
    qtyOut:   number,
    price:    number,
    stock:    number,
    value:    number
}

