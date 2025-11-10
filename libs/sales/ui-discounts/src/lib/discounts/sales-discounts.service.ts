import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { SalesDiscount } from './discounts-api.class';


export const SALES_DISCOUNTS_URL = '/sales-discounts';

@Injectable({
    providedIn: 'root',
})
export class SalesDiscountsService extends BaseEntityService<SalesDiscount> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SALES_DISCOUNTS_URL);
    }
}
