import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { VATS_URL, Vat } from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class VatService extends BaseEntityService<Vat> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, VATS_URL);
    }

}
