import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { PollQuestion, SalesPoll } from '@ss/scheduled-sales/api-scheduled-sales';

@Injectable({
    providedIn: 'root'
})
export class PollQuestionService extends BaseEntityService<PollQuestion> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/ssales/questions');
    }
}
