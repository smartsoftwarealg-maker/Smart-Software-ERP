import { BaseEntityService } from '@ss/common/api-base-entity';
import { CategoryDiscount } from './category-discount';
import { HttpService } from '@ss/common/api-common';
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryDiscountService extends BaseEntityService<CategoryDiscount> {
    curParentId = signal(0);

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/discounts', '/categories');
    }

    override setParentId(id: number) {
        super.setParentId(id);
        this.curParentId.set(id);
    }
}
