import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Class, CLASSES_URL } from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
//import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class ClassService extends BaseEntityService<Class> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CLASSES_URL);
    }
}
