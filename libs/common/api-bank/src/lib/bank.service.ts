import {Injectable} from '@angular/core';
import {BaseEntityService} from "@ss/common/api-base-entity";
import {Bank} from "@ss/common/api-lookup";
import {HttpService} from "@ss/common/api-common";
import {BANK_URL} from "./bank-api";

@Injectable({
    providedIn: 'root'
})
export class BankService extends BaseEntityService<Bank>{

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, BANK_URL);
    }

}
