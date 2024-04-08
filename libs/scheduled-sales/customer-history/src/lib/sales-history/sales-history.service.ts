import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { SalesRecord } from '@ss/scheduled-sales/api-scheduled-sales';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({ providedIn: 'root' })

export class SalesHistoryService extends BaseEntityService<SalesRecord>{
    constructor(protected httpSv: HttpService) {
        super(httpSv, 'sales-history', '/ssales/agents' )
    }
}
