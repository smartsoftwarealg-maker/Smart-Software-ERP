import { Injectable } from '@angular/core';
import { BaseEntityService } from "@ss/common/api-base-entity";
import { CItem } from '@ss/costing/costing-utils';
import { HttpService } from "@ss/common/api-common";

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseEntityService<CItem> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, '/costing/items');
  }
}
