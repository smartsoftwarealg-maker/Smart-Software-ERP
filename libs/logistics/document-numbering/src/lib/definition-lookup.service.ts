import { Injectable } from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Definition, DEFINITION_URL} from './document-api';

@Injectable({
  providedIn: 'root'
})
export class DefinitionLookupService extends BaseEntityExtendedService<Definition> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, DEFINITION_URL);
  }
}
