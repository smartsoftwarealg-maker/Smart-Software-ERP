import {Injectable} from "@angular/core";
import {HttpService} from "@ss/common/api-common";
import {Option} from "./option.class";
import {BaseEntityExtendedService} from "@ss/common/api-base-entity";

export const OPTION_URL = '/logistics/options';

@Injectable({
    providedIn: 'root'
})

export class OptionService extends BaseEntityExtendedService<Option> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, OPTION_URL);
    }
}

