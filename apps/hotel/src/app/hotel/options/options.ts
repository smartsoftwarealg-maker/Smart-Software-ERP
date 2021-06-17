import {Observable} from 'rxjs';
import {HttpService} from 'smart-shared';

export interface HotelOptions {
    roomRef: string;
    roomVat: number;
    roomTax: number;
    gymRef: string;
    gymVat: number;
    gymCost: number;
    // id
    roomArticleId: number;
    roomTaxArticleId: number;
    gymArticleId: number;
}

