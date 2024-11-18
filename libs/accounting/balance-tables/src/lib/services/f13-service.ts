import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { F13 } from './balance-tables.api';
import { HttpService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class F13Service extends BaseEntityService<F13> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/fiscal-t13', '/accounting/files');
    }
}
