import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ELEMENTSINFO_URL, ElementsInfo} from './elements-info-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class ElementsInfoService extends BaseEntityService<ElementsInfo>{

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, ELEMENTSINFO_URL);
    }
}
