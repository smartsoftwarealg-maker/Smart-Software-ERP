import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {MESSAGES_URL, USER_URL, UserMessage} from './workflow-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class UserMessageService extends BaseEntityService<UserMessage> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, MESSAGES_URL, USER_URL)
  }
}
