import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { F0910 } from './balance-tables.api';
import { HttpService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class F0910Service extends BaseEntityService<F0910> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/accounting/fiscal-0910', );
    }
}
