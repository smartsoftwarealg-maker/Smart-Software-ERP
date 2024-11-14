import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Lookup } from '@ss/common/api-lookup';

@Injectable({ providedIn: 'root' })
export class MutualTypeService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/social/mutual_types');
    }

}
