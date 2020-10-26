import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {CATEGORIES_URL, Category} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class CategoryService extends BaseEntityService<Category> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CATEGORIES_URL);
    }

}
