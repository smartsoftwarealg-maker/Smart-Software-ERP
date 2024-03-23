import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { RECEIVED_MESSAGES_URL, USER_URL, UserMessage } from "@ss/workflow";
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class UserReceivedMessageService extends BaseEntityService<UserMessage> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, RECEIVED_MESSAGES_URL, USER_URL);
    }
}
