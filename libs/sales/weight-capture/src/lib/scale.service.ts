import { inject, Injectable } from '@angular/core';
import {Observable, Subject, timer, switchMap, takeUntil, map, tap} from 'rxjs';
import {ScaleList, WeightCaptureService} from '@ss/sales/weight-capture';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ScaleService {
    private url: string = '';
    private stopPolling$: Subject<void> | null = null;
    private http: HttpClient = inject(HttpClient);
    private weightCaptureService = inject(WeightCaptureService);

    startPolling(): Observable<ScaleList> {
        this.stopPolling$ = new Subject<void>();

        return this.weightCaptureService.getScalesConfig().pipe(
            tap(x => this.url = x.url),
            switchMap(() => timer(0, 1000)),
            takeUntil(this.stopPolling$),
            switchMap(() => this.http.get<ScaleList>(this.url))
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
