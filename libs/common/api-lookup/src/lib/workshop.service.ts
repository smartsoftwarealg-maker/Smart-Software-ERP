import {Injectable} from '@angular/core';
import {HttpService, Role} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class WorkshopService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lookups/workshops');
    }
}
