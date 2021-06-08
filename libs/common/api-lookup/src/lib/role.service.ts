import {Injectable} from '@angular/core';
import {HttpService, Role} from "@ss/common/api-common";
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class RoleService extends BaseEntityService<Role> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, '/roles');
    }
}
