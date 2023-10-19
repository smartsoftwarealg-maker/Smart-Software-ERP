import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import { ACTIVE_POSTS_URL, Post } from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class ActivePostService extends BaseEntityService<Post> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACTIVE_POSTS_URL);
    }
}
