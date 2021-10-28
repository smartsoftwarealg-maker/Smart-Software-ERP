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
    dirty: boolean;
    imageModel?: ImageModel;
}

export interface Cart {
    id: number;
    centerId: number;
    agentId: number;
    shopDate: Date;
    validated: boolean;
    processed: boolean
}
