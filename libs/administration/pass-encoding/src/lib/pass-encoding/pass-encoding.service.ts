import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PassEncodingService {
    private http = inject(HttpService);

    encode(pass: string): Observable<{password:string}> {
        return this.http.get<{ password:string }>('/encode-password', new HttpParams().set('password', pass),);
    }

    decode(pass: string): Observable<{password:string}> {
        return this.http.get<{password:string}>('/decode-password', new HttpParams().set('password', pass),
        );
    }
}
