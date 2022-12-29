import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { Check, CHECKS_URL } from './treasury-api';


@Injectable({
    providedIn: 'root'
})
export class CheckService extends BaseEntityExtendedService<Check> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CHECKS_URL);
    }
}
