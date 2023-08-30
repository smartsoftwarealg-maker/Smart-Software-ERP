import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { PM } from '@ss/cmms/cmms-api';
import { HttpService } from '@ss/common/api-common';
import { ASSETS, CMMS_PM } from './asset-api';

@Injectable({
    providedIn: 'root'
})
export class AssetPmService extends BaseEntityService<PM> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_PM, ASSETS);
    }}
