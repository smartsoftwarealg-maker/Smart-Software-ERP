import { Injectable } from '@angular/core';
import { DocRight, Right } from './models';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AccessRightsService {
    private rightsMap: Map<string, Right> = new Map<string, Right>();

    constructor(private httpSrv: HttpService) { }

    public load(): Observable<DocRight[]> {
        return this.httpSrv.get<DocRight[]>('/rights')
            .pipe(tap(res => {
                this.rightsMap = res.reduce((m, e) => {
                    m.set(e.document, e.right);
                    return m;
                }, new Map<string, Right>());
            }));
    }

    get rights(): Map<string, Right> {
        return this.rightsMap;
    }
}
