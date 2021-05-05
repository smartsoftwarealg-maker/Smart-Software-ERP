import {Injectable} from '@angular/core';
import {AccessRight, DocRight, HttpService, Right, User, UserInfo} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {UserService} from '@ss/common/api-users';


interface Severe {
    severe: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class AccessRightsService {
    private rightsMap: Map<string, Right> = new Map<string, Right>();

    constructor(private httpSrv: HttpService) {}

    public load(): Observable<DocRight[]> {
        return
            this.httpSrv.get<DocRight[]>('/rights')
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
