import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ATTRIB_TEMPL_URL, ATTRIB_VALUES_URL, AttribVal} from './attributes';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})

export class AttributeLookupService extends BaseEntityService<AttribVal> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ATTRIB_VALUES_URL, ATTRIB_TEMPL_URL);
    }
}
