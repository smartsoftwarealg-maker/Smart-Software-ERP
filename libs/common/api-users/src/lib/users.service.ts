import {Injectable} from '@angular/core';
import {User, USER_URL} from './user-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';


@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseEntityService<User> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, USER_URL);
    }

}
