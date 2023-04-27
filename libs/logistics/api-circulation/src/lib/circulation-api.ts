export const CIRCULATION_URL = '/circulation';

export interface Circulation {
    document: string,
    number:   number,
    date:     Date,
    qty:      number,
    price:    number,
    pprice:   number,
    customer: string,
    store:    string,
    pallet:   string,
    price1:   number,
    price2:   number,
    price3:   number,
    center:   string
}

