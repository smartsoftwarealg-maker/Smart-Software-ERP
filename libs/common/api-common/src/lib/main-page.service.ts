import {Injectable} from '@angular/core';
import {Right} from './models';

export interface SideNavNode {
    icon: string;
    name: string;
    route?: string;
    visible?: boolean;
    accessRights?: string;
    children?: SideNavNode[];
    backgroundColor?: string;
    customerRights?: Right;
}

@Injectable({
    providedIn: 'root'
})
export class MainPageService {

    public display: SideNavNode[] = null;
    public historyStack: SideNavNode[] = [];

    public clear(): void {
        this.display = null;
        this.historyStack = [];
    }
}
