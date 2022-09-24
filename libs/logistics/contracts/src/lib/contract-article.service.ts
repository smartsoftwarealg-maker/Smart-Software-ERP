import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Project, PROJECT_ARTICLES_URL, PROJECT_URL, ProjectReference} from './contract-api.class';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class ContractArticleService extends BaseEntityService<ProjectReference> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, PROJECT_ARTICLES_URL, PROJECT_URL);
  }
}
