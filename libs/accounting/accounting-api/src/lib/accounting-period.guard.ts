import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '@ss/common/api-common';
import {ShellService} from '@ss/common/ui-shell';
import {AccFileService} from './acc-file.service';

@Injectable({
    providedIn: 'root'
})
export class AccountingPeriodGuard  {
    constructor(private loginSrv: LoginService,
                private router: Router,
                private shellSrv: ShellService,
                private fileSrv: AccFileService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const rightTrack = this.fileSrv.accFile != null;

        if (rightTrack) {
            console.log('title', this.fileSrv.accFile);
            this.shellSrv.setLabels([{ title: this.fileSrv.fileDescription }]);
        }
        return rightTrack? true : this.router.createUrlTree(['/app/accounting/file-select']);
    }
}
