import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { CustomerSuggestion, SUGGESTIONS_URL } from './customer-suggestion.class';

@Injectable({
    providedIn: 'root'
})
export class CustomerSuggestionsService extends BaseEntityService<CustomerSuggestion> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SUGGESTIONS_URL);
    }
}
