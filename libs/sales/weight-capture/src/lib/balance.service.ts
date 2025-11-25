import { inject, Injectable } from '@angular/core';
import { Observable, Subject, timer, switchMap, takeUntil } from 'rxjs';
import { TruckScale } from '@ss/sales/weight-capture';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class BalanceService {
    private url = '';//'http://127.0.0.1:4060/api/scale/reading?id=0&api-key=737800';
    private stopPolling$: Subject<void> | null = null;
    private http: HttpClient = inject(HttpClient);

    setBalanceUrl(url:string) {
        this.url = url;
    }

    getTruckScale(): Observable<TruckScale> {
        this.stopPolling$ = new Subject<void>();
        return timer(0, 5000)
            .pipe(
                takeUntil(this.stopPolling$),
                switchMap(() => this.http.get<TruckScale>(this.url)),
            );
    }

    reset(): void {
        if (this.stopPolling$) {
            this.stopPolling$.next();
            this.stopPolling$.complete(); // optional: prevents reuse
            this.stopPolling$ = null;
        }
    }
}
