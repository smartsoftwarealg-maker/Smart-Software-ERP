import { inject, Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AIDS_URL, MEDICAL_AIDS_TYPE, SocialAid, TYPES_URL } from '@social/social-api';
import { dateToYmdStr, HttpService, LanguageService, LoginService } from '@ss/common/api-common';
import { EDO } from '../../../../../remuneration/edo/src/lib/edo-class';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SocialEDOService {
    private httpSrv  = inject(HttpService);
    private loginSrv = inject(LoginService);

    generate(edo: EDO, bankList: number[]): Observable<string[]> {
        const params = new HttpParams()
            .set('mode', 'b') // b for bank
            .set('description', edo.description)
            .set('reference', edo.reference)
            .set('banks', bankList.join(','))
            .set('bank', edo.bank)
            .set('edoId', edo.edoId)
            .set('date', dateToYmdStr(new Date(edo.date)));
        return this.httpSrv.get<string[]>('/social/edo', params);
    }

    getCenterBank(): Observable<number> {
        return this.httpSrv.get<any>(`/companies/${this.loginSrv.appCtx.company}/centers/${this.loginSrv.appCtx.center}`)
            .pipe(map(res => res['bank'] || 0));
    }

}
