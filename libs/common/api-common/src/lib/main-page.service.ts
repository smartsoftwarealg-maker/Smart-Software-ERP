import {Injectable, signal, Signal} from '@angular/core';
import { SideNavNode } from './models';


@Injectable({
    providedIn: 'root'
})
export class MainPageService {

    public display = signal<SideNavNode[] | null>(null);
    public historyStack = signal<SideNavNode[]>([]);

    public clear(): void {
        this.display.set(null);
        this.historyStack.set([]);
    }

}
