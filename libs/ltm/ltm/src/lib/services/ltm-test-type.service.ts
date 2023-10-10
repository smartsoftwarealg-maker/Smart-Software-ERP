import { Injectable } from '@angular/core';
import { LTM_LINE_TYPE_URL } from '../ltm-api';
import { BaseLookupService, HttpService } from '@ss/common/api-common';
import { BaseEntityService } from "@ss/common/api-base-entity";
import { Lookup } from "@ss/common/api-lookup";

@Injectable({
  providedIn: 'root'
})
export class LtmTestTypeService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_LINE_TYPE_URL);
    }
}
