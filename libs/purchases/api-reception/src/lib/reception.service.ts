import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from "@ss/common/api-common";
import {PURCHASE_URL} from "./reception-api";
import {Transaction} from "@ss/logistics/api-transaction";

@Injectable({
  providedIn: 'root'
})
export class ReceptionService extends BaseEntityService<Transaction> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, PURCHASE_URL);
    }
}
