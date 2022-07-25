import { Injectable } from '@angular/core';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { JOURNALS_URL, Journal } from './model';


@Injectable({
    providedIn: 'root'
})
export class JournalService extends BaseEntityExtendedService<Journal> {
    constructor(protected httpSrv: HttpService) {
        super(httpSrv, JOURNALS_URL);
    }
}