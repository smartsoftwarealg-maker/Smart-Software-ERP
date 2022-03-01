import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { WIVES_PARENT_URL, WIVES_CHILD_URL, Wife } from './employee-api';


@Injectable({ providedIn: 'root' })
export class EmployeeWivesService extends BaseEntityService<Wife> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, WIVES_CHILD_URL, WIVES_PARENT_URL);
    }

}
