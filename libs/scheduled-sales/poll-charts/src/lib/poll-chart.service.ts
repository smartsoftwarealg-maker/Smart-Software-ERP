import { inject, Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { HistoricStatistics, QuestionsStatistic, Statistics } from './poll-charts-api';

@Injectable({ providedIn: 'root' })

export class PollChartService {
    private http = inject(HttpService);

    statistics(period: number) {
        return this.http.get<Statistics[]>('/ssales/poll-statistics', new HttpParams().set('period', 202401));
    }

    questionStatistics(period: number) {
        return this.http.get<QuestionsStatistic[]>('/ssales/current-statistics', new HttpParams().set('period', 202401));
    }

    historicStatistics(period: number) {
        return this.http.get<HistoricStatistics[]>('/ssales/historic-statistics', new HttpParams().set('period', 202401));
    }
}
