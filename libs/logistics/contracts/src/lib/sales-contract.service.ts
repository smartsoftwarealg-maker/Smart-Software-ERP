import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Project, PROJECT_URL} from './contract-api.class';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class SalesContractService extends BaseEntityService<Project> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, PROJECT_URL);
  }
}
