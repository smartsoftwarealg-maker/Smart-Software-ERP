import { Injectable } from '@angular/core';
import { SideNavNode } from '@ss/common/ui-shell';

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
