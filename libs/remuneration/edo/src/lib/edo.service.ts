import {Injectable} from '@angular/core';
import {HttpService, LanguageService, LoginService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {EDO} from './edo-class';

@Injectable({
    providedIn: 'root'
})

export class EdoService {

    constructor(private httpSrv: HttpService,
                private langSrv: LanguageService,
                private loginSrv: LoginService) {
    }

    generate(edo: EDO, bankList: number[]): Observable<string[]> {
        const mm = +edo.month;
        const yy = +edo.year;
        const period = yy * 100 + mm;
        const params = new HttpParams()
            .set('mode', 'b') // b for bank
            .set('description', edo.description)
            .set('formula', edo.formula)
            .set('reference', edo.reference)
            .set('special', edo.special + '')
            .set('period', period + '')
            .set('banks', bankList.join(','))
            .set('bank', edo.bank + '')
            .set('date', this.langSrv.formatDate(edo.date))
            .set('all', edo.all);
        return this.httpSrv
            .get<{ edo: string[]}>('/payroll/edo', params)
            .pipe(map(res => res.edo));
    }

    getCenterBank(): Observable<number> {
        return this.httpSrv.get<any>(`/companies/${this.loginSrv.appCtx.company}/centers/${this.loginSrv.appCtx.center}`)
            .pipe(map(res => res['bank'] || 0));
    }
}
