import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {DOCUMENTS_URL, LDocument} from './document-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
  providedIn: 'root'
})
export class DocumentNumberingService extends BaseEntityService<LDocument> {

  constructor(protected httpSrv: HttpService) {
      super(httpSrv, DOCUMENTS_URL);
  }
}
