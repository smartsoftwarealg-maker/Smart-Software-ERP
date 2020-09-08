import { Injectable } from '@angular/core';
import { BaseEntityService, HttpService } from '@ss/common/api-common';
import { VATS_URL, Vat } from './lookups-api';

@Injectable({
    providedIn: 'root'
})
export class VatService extends BaseEntityService<Vat> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, VATS_URL);
    }

}
