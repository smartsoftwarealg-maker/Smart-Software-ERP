import { Injectable, signal } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    ACC_DETAIL_URL, ACC_PIECE_SUMMARY_URL,
    ACC_TRANSACTIONS_URL, ACCTransactionLine, Anomaly, PieceSummary
} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
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

    duplicate(journalNo: number, pieceNo: number, destinationId: number): Observable<{ count: number }> {
        const data = { journalNo: journalNo, pieceNo: pieceNo, destinationId: destinationId };
        return this.httpSrv.post('/accounting/duplicate', data);
    }

    getAnomalies(): Observable<Anomaly[]> {
        return this.httpSrv.get('/accounting/anomalies');
    }
}
