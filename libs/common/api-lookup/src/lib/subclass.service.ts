import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Subclass, SUBCLASSES_URL } from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class SubclassService extends BaseEntityService<Subclass> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, SUBCLASSES_URL);
    }
}
