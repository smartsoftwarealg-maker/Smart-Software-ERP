import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {DOC_STATUS_URL, DocStatus, MESSAGES_URL, USER_URL} from './workflow-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class DocStatusService extends BaseEntityService<DocStatus>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DOC_STATUS_URL);
    }
}
