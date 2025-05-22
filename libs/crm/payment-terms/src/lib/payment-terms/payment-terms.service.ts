import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Lookup } from '@ss/logistics/ui-doc-import';

export const PAYMENT_TERMS_URL = '/crm/crm_payment_terms';

@Injectable({
    providedIn: 'root',
})
export class PaymentTermsService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, PAYMENT_TERMS_URL);
    }
}
