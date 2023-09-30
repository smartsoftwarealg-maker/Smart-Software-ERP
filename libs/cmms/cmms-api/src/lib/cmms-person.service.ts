import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMSEmployee } from './cmms-api';

@Injectable({
    providedIn: 'root'
})

export class CmmsPersonService extends BaseEntityService<CMMSEmployee> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/cmms/persons');
    }
}
