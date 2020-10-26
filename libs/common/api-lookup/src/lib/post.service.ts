import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Post, POSTS_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class PostService extends BaseEntityService<Post> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, POSTS_URL);
    }

}
