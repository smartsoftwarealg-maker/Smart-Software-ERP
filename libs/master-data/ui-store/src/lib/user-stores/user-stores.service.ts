import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { STORES_URL, USERS_URL, UserStore } from '@ss/master-data/api-article';

@Injectable({
  providedIn: 'root'
})
export class UserStoresService extends BaseEntityService<UserStore> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, STORES_URL, USERS_URL);
  }
}
