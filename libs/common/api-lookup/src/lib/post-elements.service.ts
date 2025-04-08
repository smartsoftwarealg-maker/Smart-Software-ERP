import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { PostElement } from './lookups-api';

@Injectable({
    providedIn: 'root'
})
export class PostElementsService extends BaseEntityService<PostElement> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/elements', '/posts');
    }
}
