import { Injectable } from '@angular/core';
import { SideNavNode } from '@ss/common/ui-shell';

@Injectable({
    providedIn: 'root'
})
export class WelcomeService {

    public navData: SideNavNode[];
    public display: SideNavNode[];
    public historyStack: SideNavNode[] = [];

}
