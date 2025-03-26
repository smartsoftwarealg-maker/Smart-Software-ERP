import { Injectable, signal } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    ACC_DETAIL_URL, ACC_PIECE_SUMMARY_URL,
    ACC_TRANSACTIONS_URL,
    ACCTransactionLine, PieceSummary
} from "./accounting-api";
import {HttpService} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AccTransactionLineService extends BaseEntityService<ACCTransactionLine> {
    updateCounter = signal(0);

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_DETAIL_URL, ACC_TRANSACTIONS_URL);
    }

    getPieceSummary(id: number): Observable<PieceSummary> {
        return this.httpSrv.get<PieceSummary>(ACC_PIECE_SUMMARY_URL, new HttpParams().set('id', id));
    }

    updateStatus() {
        this.updateCounter.update(n => n + 1);
    }
}
