import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {STORES_URL, USERS_URL, UserStore} from '@ss/stock/api-article';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class UserStoresService extends BaseEntityService<UserStore> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, STORES_URL, USERS_URL);
  }
}
