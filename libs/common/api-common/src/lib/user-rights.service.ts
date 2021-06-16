import {Injectable} from '@angular/core';
import {DocRight, Right} from './models';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {AppContextService} from './app-context.service';

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

    constructor(private httpSrv: HttpService, private contextSrv: AppContextService) { }

    public load(): Observable<DocRight[]> {
        return this.httpSrv.get<Lookup[]>('/lookups/forms')
            .pipe(switchMap(res => {
                    this.forms = res;
                    return this.httpSrv.get<DocRight[]>('/rights')
                }),
                tap((res: DocRight[]) => {
                    this.rightsMap = res.reduce((m, e) => {
                        m.set(e.document, { read: e.read, write: e.write, edit: e.edit, delete: e.delete});
                        return m;
                    }, new Map<string, Right>());
                }));
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
        const manager = this.contextSrv.context.manager;
        const severe = this.contextSrv.context.severe;
        return {
            read: manager || !severe,
            write: manager || !severe,
            edit: manager || !severe,
            delete: manager || !severe
        };
    }

    clear() {
        this.rightsMap.clear();
    }
}
