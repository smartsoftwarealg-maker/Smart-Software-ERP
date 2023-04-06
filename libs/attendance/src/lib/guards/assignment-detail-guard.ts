import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {PersonShiftService} from '../person-shift.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AssignmentDetailGuard {
    constructor(private personShiftSrv: PersonShiftService,
                private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.personShiftSrv.getParentId() > 0 ? true : this.router.createUrlTree(['/app/attendance/shift-assignments']);
    }

}
