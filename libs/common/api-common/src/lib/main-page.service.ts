import { Injectable } from '@angular/core';

export interface SideNavNode {
    icon: string;
    name: string;
    route?: string;
    visible?: boolean;
    accessRights?: string;
    children?: SideNavNode[];
    backgroundColor?: string;
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
