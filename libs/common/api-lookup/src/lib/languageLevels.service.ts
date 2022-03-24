import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Language, LANGUAGE_LEVELS_URL } from './lookups-api';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class LanguageLevelsService extends BaseEntityService<Language> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, LANGUAGE_LEVELS_URL);
    }
}
