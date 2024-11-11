import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Inbox, INBOX_COUNT, INBOX_URL } from "./workflow-api";
import {HttpService, PaginationModel} from '@ss/common/api-common';
import {HttpParams} from '@angular/common/http';
import { catchError, Observable, of, repeat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowInboxService extends BaseEntityService<Inbox> {
    private _all = false;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, INBOX_URL)
    }

    set all(value: boolean) {
        this._all = value;
    }

    countInbox(): Observable<{ count: number }> {
        return this.httpSrv
            .get<{ count: number }>(INBOX_COUNT)
            .pipe(
                repeat( { delay: 3_600_000 }),
                catchError(() => of({ count: 0}))
            );
    }

    override getPage(pageModel: PaginationModel, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<Inbox[]> {
        const moreParams = this._all? new HttpParams().set("all", "true") : extraPrams;
        return super.getPage(pageModel, filter, sortBy, moreParams);
    }
}
