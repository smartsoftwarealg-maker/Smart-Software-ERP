import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { IMPORT_PURCHASE_URL, Transaction } from '@ss/logistics/api-transaction';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class ImportReceptionService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, IMPORT_PURCHASE_URL);
    }

}
