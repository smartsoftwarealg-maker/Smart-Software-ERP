import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';
import {HttpService} from '@ss/common/api-common';
import {BANKS_URL} from '@ss/administration/api-bank';
import {ACC_PROJECTS_URL} from './accounting-api';

@Injectable({
  providedIn: 'root'
})
export class AccProjectService extends BaseEntityService<Lookup>{
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_PROJECTS_URL);
    }

}
