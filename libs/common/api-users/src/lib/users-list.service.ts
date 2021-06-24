import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService, User, USER_URL} from '@ss/common/api-common';


@Injectable({
    providedIn: 'root'
})
export class UserListService extends BaseEntityExtendedService<User> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, USER_URL);
    }
}
