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
    private pContext: UserContext = null;

    constructor(private httpSrv: HttpService) { }

    get context() {
        return this.pContext;
    }

    get loaded() {
        return this.pContext != null;
    }

    load(): Observable<UserContext> {
        return this.httpSrv
            .get<UserContext>('/context')
            .pipe(switchMap((res: UserContext) => {
                this.pContext = res;
                this.pContext.manager = !this.pContext.agentId && !this.pContext.personId;
                return this.httpSrv.get<{ severe: boolean }>('/rights/severe');
            }),
                switchMap((res: any) => {
                    this.pContext.severe = res.severe;
                    return of(this.pContext);
                }),
                switchMap((res: any) => {
                    const agentObs = this.httpSrv
                        .get<UserContext>(`/agents/${this.pContext.agentId}`)
                        .pipe(tap((next: any) => {
                            this.pContext.fullName = next['denomination'];
                            this.pContext.pwdExpired = next && next.pwdExpired;
                        }),
                            switchMap(_ => of(this.pContext)));
                    const personObs = this.httpSrv
                        .get<Object>(`/persons/${this.pContext.personId}`)
                        .pipe(tap(next => {
                            this.pContext.fullName = next['firstName'] +
                                ' ' +
                                next['lastName'];
                        }),
                            switchMap(_ => of(this.pContext)));

                    const userObs = this.httpSrv
                        .get<User>(`/login/users/${this.pContext.userId}`)
                        .pipe(tap((next: User) => {
                            this.pContext.fullName = next.fullName;
                        }),
                            switchMap(_ => of(this.pContext)));
                    return res.agentId ? agentObs : res.personId ? personObs : userObs;
                }),
                switchMap(_ => of(this.pContext)));
    }


    clear() {
        this.pContext = null;
    }
}
