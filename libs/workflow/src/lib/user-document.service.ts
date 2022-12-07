import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {DOCUMENT_URL, MESSAGES_URL, USER_URL, UserDocument, UserMessage} from './workflow-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class UserDocumentService extends BaseEntityService<UserDocument> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, DOCUMENT_URL, USER_URL)
  }
}
