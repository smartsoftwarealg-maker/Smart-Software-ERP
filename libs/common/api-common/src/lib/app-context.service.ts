import {Injectable} from '@angular/core';
import {HttpService, UserContext} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {tap, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AppContextService {
    private _context: UserContext = null;

    constructor(private httpSrv: HttpService) {
    }

    get context() {
        return this._context;
    }

    getContext(): Observable<UserContext> {
        return this.httpSrv
            .get<UserContext>('/context')
            .pipe(switchMap(res => {
                this._context = res;
                return of(res);
            }));
    }

    clear() {
        this._context = null;
    }
}
