import { BaseEntityService } from '@ss/common/api-base-entity';
import { Lookup } from '@ss/common/api-lookup';
import { HttpService } from '@ss/common/api-common';

export class BaseLookupService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService, protected override url: string) {
        super(httpSrv, url);
    }

}
