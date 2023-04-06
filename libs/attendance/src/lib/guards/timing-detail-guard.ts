import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {PersonShiftService} from '../person-shift.service';
import {Injectable} from '@angular/core';
import {ShiftTimingService} from '../shift-timing.service';

@Injectable({
    providedIn: 'root'
})
export class TimingDetailGuard {
    constructor(private timingSrv: ShiftTimingService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const idx = state.url.indexOf('/detail');
        return this.timingSrv.getParentId() > 0 ? true : this.router.createUrlTree([state.url.substring(0, idx)]);
    }
}
