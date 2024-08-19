import { inject, Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '@ss/common/api-common';
import {ShellService} from '@ss/common/ui-shell';
import {AccFileService} from './acc-file.service';

@Injectable({
    providedIn: 'root'
})
export class AccountingPeriodGuard  {
    private loginSrv = inject( LoginService);
    private router   = inject(Router);
    private shellSrv = inject( ShellService);
    private fileSrv  = inject(AccFileService);
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const rightTrack = this.fileSrv.accFile != null &&
                                    this.loginSrv.appCtx &&
                                    this.loginSrv.appCtx.accPeriod > 0;

        if (rightTrack) {
            this.shellSrv.setLabels([{ title: `${this.fileSrv.fileDescription}: ${this.loginSrv.appCtx.accPeriod}/${this.fileSrv.curPeriod}`  }]);
        }
        return rightTrack? true : this.router.createUrlTree(['/app/accounting/file-select']);
    }
}
