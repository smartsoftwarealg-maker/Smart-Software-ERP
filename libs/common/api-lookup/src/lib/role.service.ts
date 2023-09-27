import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Lookup } from './lookup.class';

@Injectable({
    providedIn: 'root'
})
export class RoleService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lookups/roles');
    }
}
