import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {ELEMENT_LOANS_URL, ElementType} from './element-type';

@Injectable({
    providedIn: 'root'
})
export class LoanTypeService extends BaseEntityService<ElementType> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ELEMENT_LOANS_URL);
    }
}
