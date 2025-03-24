import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ELine, FIXED_ELEMENTS_URL, INPUT_ELEMENTS_URL, Journal, PaymentElement} from '../elements-entry-api';
import {HttpService} from '@ss/common/api-common';
import {HttpParams} from '@angular/common/http';
import {map, Observable, tap, zip} from 'rxjs';
import {InputFilter, InputFiltersService} from '@ss/remuneration/input-filters';
import {ElementsInfo, ElementsInfoService} from '@ss/remuneration/elementsinfo';
import { Lookup } from '@ss/common/api-lookup';

@Injectable({
  providedIn: 'root'
})
export class PaymentModeService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/payroll/paymentmodes');
    }

}
