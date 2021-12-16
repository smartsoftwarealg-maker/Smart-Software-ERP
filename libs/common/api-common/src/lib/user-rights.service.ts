import {Injectable} from '@angular/core';
import {DocRight, Right} from './models';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {LoginService} from './login.service';

interface Lookup {
    id: number;
    description: string;
}

@Injectable({
    providedIn: 'root'
})

export class UserRightsService {
    private rightsMap: Map<string, Right> = new Map<string, Right>();
    private forms: Lookup[] = [];

    constructor(private httpSrv: HttpService, private loginSrv: LoginService) { }

    public load(): Observable<DocRight[]> {
        return this.httpSrv.get<Lookup[]>('/lookups/forms')
            .pipe(switchMap(res => {
                    this.forms = res;
                    return this.httpSrv.get<DocRight[]>('/rights')
                }),
                tap((res: DocRight[]) =>
                    res.forEach(e => this.rightsMap.set(e.document, { read: e.read, write: e.write, edit: e.edit, delete: e.delete}))
                ));
    }

    get rights(): Map<string, Right> {
        return this.rightsMap;
    }

    canUserPass(component: string): boolean {
        return this.getUserRights(component).read;
    }

    canUserAdd(component: string): boolean {
        return this.getUserRights(component).write;
    }

    canUserEdit(component: string): boolean {
        return this.getUserRights(component).edit;
    }

    canUserDelete(component: string): boolean {
        return this.getUserRights(component).delete;
    }

    getUserRights(component: string): Right {
        if (!component) {
            return this.getDefault();
        }
        return this.rightsMap.get(component) || this.getDefault();
    }

    private getDefault(): Right {
        const manager = this.loginSrv?.appCtx?.manager;
        const severe = this.loginSrv?.appCtx?.severe && this.loginSrv.appCtx.id > 0;
        return {
            read:   manager || !severe || this.loginSrv.appCtx.agentId > 0,
            write:  (manager || !severe) && this.loginSrv.appCtx && !this.loginSrv.appCtx.agentId,
            edit:   (manager || !severe) && this.loginSrv.appCtx && !this.loginSrv.appCtx.agentId,
            delete: (manager || !severe) && this.loginSrv.appCtx && !this.loginSrv.appCtx.agentId
        };
    }

    clear() {
        this.rightsMap.clear();
    }
}
