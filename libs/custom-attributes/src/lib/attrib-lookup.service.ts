import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ATTRIB_TEMPL_URL, ATTRIB_VALUES_URL, AttribTempl} from '@ss/custom-attributes';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class AttribLookupService extends BaseEntityService<AttribTempl>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ATTRIB_VALUES_URL, ATTRIB_TEMPL_URL);
    }
}
