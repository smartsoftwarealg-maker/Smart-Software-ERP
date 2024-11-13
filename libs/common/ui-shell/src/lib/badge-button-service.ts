import { Injectable } from '@angular/core';
import { BadgeButton } from '@ss/common/ui-shell';
import { asyncScheduler, observeOn } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BadgeButtonService {
    #buttons: Set<BadgeButton> = new Set<BadgeButton>();

    public addBadgeButton(btn: BadgeButton): void {
        if (![ ...this.#buttons].find(e => e.badgeId === btn.badgeId)) {
            btn.visible = false;
            this.#buttons.add(btn);
            btn.countObservable
                .pipe(observeOn(asyncScheduler))
                .subscribe(res => {
                    btn.visible = res.count > 0;
                    btn.badgeCount = res.count;
                });
        }
    }

    public getButtons(): BadgeButton[] {
        return [ ...this.#buttons];
    }
}
