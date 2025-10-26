import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Lookup } from '@ss/logistics/ui-doc-import';
import {PackagingUnit} from "./packaging-units.api";


@Injectable({
    providedIn: 'root',
})
export class PackagingUnitsService extends BaseEntityService<PackagingUnit> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/logistics/packaging-units');
    }
}
