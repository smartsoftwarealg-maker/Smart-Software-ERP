import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Lookup } from '@ss/logistics/ui-doc-import';


@Injectable({
    providedIn: 'root'
})
export class PackagingUnitService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lookups/packaging_units');
    }
}
