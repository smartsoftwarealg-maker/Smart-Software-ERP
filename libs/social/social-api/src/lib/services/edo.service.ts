import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AIDS_URL, MEDICAL_AIDS_TYPE, SocialAid, TYPES_URL } from '@social/social-api';
import { dateToYmdStr, HttpService, LanguageService, LoginService } from '@ss/common/api-common';
import { EDO } from '../../../../../remuneration/edo/src/lib/edo-class';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MedicalAidService  {
    constructor(private httpSrv: HttpService, private loginSrv: LoginService) {
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
            .set('month', mm)
            .set('year', yy)
            .set('banks', bankList.join(','))
            .set('bank', edo.bank + '')
            .set('date', dateToYmdStr(new Date(edo.date)));
        return this.httpSrv
            .get<{ edo: string[]}>('/payroll/edo', params)
            .pipe(map(res => res.edo));
    }

    getCenterBank(): Observable<number> {
        return this.httpSrv.get<any>(`/companies/${this.loginSrv.appCtx.company}/centers/${this.loginSrv.appCtx.center}`)
            .pipe(map(res => res['bank'] || 0));
    }

}
