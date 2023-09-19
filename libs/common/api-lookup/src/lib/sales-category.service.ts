import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Category, SALES_CATEGORY_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class SalesCategoryService extends BaseEntityService<Category> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SALES_CATEGORY_URL);
    }
}
