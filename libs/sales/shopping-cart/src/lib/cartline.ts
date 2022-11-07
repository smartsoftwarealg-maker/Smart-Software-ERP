import {ImageModel} from "@ss/common/ui-image-input";

export const CART_URL = '/cart';
export const CARTLINES_URL = '/cartlines';

export interface Cartline {
    id: number;
    cartId: number;
    partId?: number;
    reference?: string;
    description?: string;
    qty: number;
    price: number;
    mark?: string;
    validated: boolean;
    imageModel?: ImageModel;
}

export interface Cart {
    id: number;
    centerId: number;
    agentId: number;
    shopDate: Date;
    validated: boolean;
    processed: boolean;
}


export interface Total {
    subtotal: number;
    tax: number;
    freight: number;
    shipping: number;
    productName?: string;
}

export interface Customer{
    firstName : string;
    lastName : string;
    address : string;
    email: String
}

export interface Order{
                 subtotal: string;
                 tax:      string;
                 total:    string;
                 freight:  string;
                 shipping: string;
                 productName : string;
                 customer?:   Customer,
                 currency:    String
}

export interface Review {
    description: string;
    subtotal: string,
    shipping: string,
    tax: string,
    total: string,
    lastName: string,
    firstName: string,
    billingAddress?: string;
    recipientName?: string;
}
