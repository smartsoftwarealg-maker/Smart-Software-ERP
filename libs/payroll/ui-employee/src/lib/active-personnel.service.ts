import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ActivePersonnelService {

    private isActive = signal(false);

    public get val(): boolean {
        return this.isActive();
    }

    public set(active: boolean) {
        this.isActive.set(active);
    }
}
