import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Lookup } from '@ss/common/api-lookup';
import { SUGGESTIONS_TYPE_URL } from './customer-suggestion.class';

@Injectable({
    providedIn: 'root'
})
export class SuggestionTypeService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SUGGESTIONS_TYPE_URL);
    }
}
