import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpService} from '@ss/common/api-common';

export interface LookupCache {
    expireTime: number;
    data: any[];
}

@Injectable({
    providedIn: 'root'
})
export class LookupsCacheService implements OnInit, OnDestroy {

    constructor(private httpSrv: HttpService) {}

    readonly cacheTime = 120 * 1000; // 2 minutes
    interval: any;
    cache: { [key:string]: LookupCache } = {};

    ngOnInit(): void {
        this.interval = setInterval(() => this.cleanUp(), 10);
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
    }

    public load<T>(url: string, cacheName: string, cacheTime = this.cacheTime): Observable<T[]> {
        const lookup = this.cache[cacheName];
        if (lookup != null && lookup.data != null) {
            return of(lookup.data);
        }
        return this.httpSrv.get<T[]>(url)
            .pipe(tap(data => {
                this.cache[cacheName] = {
                    data: data,
                    expireTime: Date.now() + cacheTime
                };
            }));
    }

    private cleanUp() {
        const now = Date.now();
        for (const c in this.cache) {
            if (this.cache[c] != null) {
                const item = this.cache[c];
                if (item.expireTime <= now) {
                    this.cache[c] = null;
                }
            }
        }
    }
}
