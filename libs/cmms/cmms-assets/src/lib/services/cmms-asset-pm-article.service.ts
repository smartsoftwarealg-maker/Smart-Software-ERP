import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_PM, CMMS_PM_PARTS, PMPart } from './asset-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CmmsAssetPmArticleService extends BaseEntityService<PMPart> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_PM_PARTS, CMMS_PM);
        this.setParentId(0);
    }

    override setParentId(id: number) {
        // eslint-disable-next-line no-debugger
        debugger;
        super.setParentId(id);
    }
}
