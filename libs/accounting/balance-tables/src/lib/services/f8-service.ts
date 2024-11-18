import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { F8 } from './balance-tables.api';
import { HttpService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class F8Service extends BaseEntityService<F8> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/fiscal-t81', '/accounting/files');
    }
}
