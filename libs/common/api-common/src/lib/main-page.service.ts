import {Injectable} from '@angular/core';
import { SideNavNode } from './models';


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
