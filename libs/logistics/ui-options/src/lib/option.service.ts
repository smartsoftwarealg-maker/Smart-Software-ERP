import {Injectable} from "@angular/core";
import {BaseEntityExtendedService} from "@ss/common/api-base-entity";
import {PayMethod, PayMode} from "@ss/common/api-lookup";
import {HttpService} from "@ss/common/api-common";
import {switchMap, tap} from "rxjs/operators";
import {PaginationModel} from "@ss/common/ui-pagination";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MPAY_URL} from "@ss/logistics/api-logistics-common";
import {Option} from "@ss/logistics/ui-options";

export const OPTION_URL = '/logistics/options';

@Injectable({
    providedIn: 'root'
})

export class OptionService extends BaseEntityExtendedService<Option> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, OPTION_URL);
    }
}

