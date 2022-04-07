import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ACC_JOURNALS_URL, Journal} from './accounting-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class AccJournalsService extends BaseEntityService<Journal> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_JOURNALS_URL);
    }
}
