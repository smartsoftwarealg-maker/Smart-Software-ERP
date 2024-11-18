import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { F12 } from './balance-tables.api';
import { HttpService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class F12Service extends BaseEntityService<F12> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/fiscal-t12', '/accounting/files');
    }
}
