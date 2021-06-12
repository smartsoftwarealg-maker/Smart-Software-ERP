import { Injectable } from '@angular/core';
import { DocRight, Right } from './models';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {AppContextService} from './app-context.service';

@Injectable({
    providedIn: 'root'
})

export class UserRightsService {
    private rightsMap: Map<string, Right> = new Map<string, Right>();

    constructor(private httpSrv: HttpService,
                private contextSrv: AppContextService) { }

    public load(): Observable<DocRight[]> {
        return this.httpSrv.get<DocRight[]>('/rights')
            .pipe(tap((res: DocRight[]) => {
                this.rightsMap = res.reduce((m, e) => {
                    m.set(e.document, e.right);
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
        return this.getUserRights(component).create;
    }

    canUserEdit(component: string): boolean {
        return this.getUserRights(component).edit;
    }

    canUserDelete(component: string): boolean {
        return this.getUserRights(component).del;
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
            create: manager || !severe,
            edit: manager || !severe,
            del: manager || !severe
        };
    }

    clear() {
        this.rightsMap.clear();
    }
}
