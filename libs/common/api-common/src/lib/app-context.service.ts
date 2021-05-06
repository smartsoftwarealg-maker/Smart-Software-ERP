import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from './models';
import { UserContext } from './models';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AppContextService {
    private _context: UserContext = null;

    constructor(private httpSrv: HttpService) { }

    get context() {
        return this._context;
    }

    load(): Observable<UserContext> {
        return this.httpSrv
            .get<UserContext>('/context')
            .pipe(switchMap(res => {
                this._context = res;
                this._context.manager = !this._context.agentId && !this._context.personId;
                return this.httpSrv.get<{ severe: boolean }>('/rights/severe');
            }),
                switchMap(res => {
                    this._context.severe = res.severe;
                    return of(this._context);
                }),
                switchMap(res => {
                    const agentObs = this.httpSrv
                        .get<UserContext>(`/agents/${this._context.agentId}`)
                        .pipe(tap(next => {
                            this._context.fullName = next['denomination'];
                            this._context.pwdExpired = next && next.pwdExpired;
                        }),
                            switchMap(_ => of(this._context)));
                    const personObs = this.httpSrv
                        .get<Object>(`/persons/${this._context.personId}`)
                        .pipe(tap(next => {
                            this._context.fullName = next['firstName'] +
                                ' ' +
                                next['lastName'];
                        }),
                            switchMap(_ => of(this._context)));

                    const userObs = this.httpSrv
                        .get<User>(`/login/users/${this._context.userId}`)
                        .pipe(tap((next: User) => {
                            this._context.fullName = next.fullName;
                        }),
                            switchMap(_ => of(this._context)));
                    return res.agentId ? agentObs : res.personId ? personObs : userObs;
                }),
                switchMap(_ => of(this._context)));
    }


    clear() {
        this._context = null;
    }
}
