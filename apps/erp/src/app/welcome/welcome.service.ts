import { Injectable } from '@angular/core';
import { SideNavNode } from '@ss/common/ui-shell';

@Injectable({
    providedIn: 'root'
})
export class WelcomeService {

    public display: SideNavNode[];
    public historyStack: SideNavNode[] = [];

    public reset(nav: SideNavNode[]) {
        this.display = nav;
        this.historyStack = [];

    }
}
