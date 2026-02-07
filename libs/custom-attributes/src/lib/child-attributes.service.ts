import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Attrib, ATTRIB_TEMPL_URL} from './attributes';

@Injectable({
    providedIn: 'root'
})
export class ChildAttributesService extends BaseEntityService<Attrib>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ATTRIB_TEMPL_URL);
    }
}
