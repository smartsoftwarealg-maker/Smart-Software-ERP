import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {MailBox, MAILBOX_URL, USER_URL} from './workflow-api';
import {HttpService} from '@ss/common/api-common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailBoxService extends BaseEntityService<MailBox> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, MAILBOX_URL, USER_URL)
    }

    broadcast(id: number): Observable<any> {
        return this.httpSrv.post('/workflow/broadcast', { id: id });
    }
}
