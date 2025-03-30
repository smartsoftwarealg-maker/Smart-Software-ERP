import { inject, Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { CURRENT_URL, HISTORIC_URL, QuestionsStatistic, Statistics, STATISTICS_URL } from './poll-charts-api';

@Injectable({ providedIn: 'root' })

export class PollChartService {
    private http = inject(HttpService);

    statistics() {
        return this.http.get<Statistics[]>(STATISTICS_URL, new HttpParams());
    }

    questionStatistics() {
        return this.http.get<QuestionsStatistic[]>(CURRENT_URL, new HttpParams());
    }

    historicStatistics() {
        return this.http.get<QuestionsStatistic[]>(HISTORIC_URL, new HttpParams());
    }
}
