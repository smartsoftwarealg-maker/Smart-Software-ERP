import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {INPUT_FILTER_URL, InputFilter} from './input-filter-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class InputFiltersService extends BaseEntityService<InputFilter> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, INPUT_FILTER_URL);
    }
}
