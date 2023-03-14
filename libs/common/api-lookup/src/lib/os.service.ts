import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {Mark, MARKS_URL, OS_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Observable} from 'rxjs';
import {Lookup} from './lookup.class';

@Injectable({
    providedIn: 'root'
})
export class OSService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, OS_URL);
    }
}
