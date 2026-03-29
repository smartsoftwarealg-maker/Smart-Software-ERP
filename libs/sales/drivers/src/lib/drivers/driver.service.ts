import { inject, Injectable } from '@angular/core';
import { SalesDriver } from './driver-api';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';


@Injectable({
    providedIn: 'root'
})
export class DriverService extends BaseEntityService<SalesDriver> {
  constructor() {
      super(inject(HttpService), '/sales-drivers');
  }
}
