import {Injectable} from '@angular/core';
import {BaseEntityService} from "@ss/common/api-base-entity";
import {HttpService} from "@ss/common/api-common";
import {User, USERS_URL} from "./user-api";

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseEntityService<User>{

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, USERS_URL);
    }
}
