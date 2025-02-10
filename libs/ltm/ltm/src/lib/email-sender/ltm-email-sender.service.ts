import { inject, Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpService } from '@ss/common/api-common';

@Injectable()
export class LtmEmailSenderService {
    #httpSrv = inject(HttpService);

    send(document: number, form: string, subject?: string, message?: string, password?: string): Observable<any> {
        console.log('______________________________', password);
        const params = new HttpParams()
            .set('document', document + '')
            .set('form', form)
            .set('password', password)
            .set('message', message)
            .set('subject', subject);
        return this.#httpSrv.get<any>('/ltm/email', params);
    }

}
