import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {ELEMENT_TYPE_URL, ElementType} from '@ss/payroll-common';

@Injectable({
  providedIn: 'root'
})
export class ElementTypesService extends BaseEntityService<ElementType> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, ELEMENT_TYPE_URL);
    }
}
