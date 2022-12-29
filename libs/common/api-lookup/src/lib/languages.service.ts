import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Language, LANGUAGES_URL } from './lookups-api';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class LanguagesService extends BaseEntityService<Language> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LANGUAGES_URL);
    }
}
