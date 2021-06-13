import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Deposit} from "./models";


@Injectable({
  providedIn: 'root'
})
export class CurrencyTransferService extends BaseEntityExtendedService<Deposit> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, '/ctransfers');
    }
}
