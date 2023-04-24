import {Injectable, Input} from '@angular/core';
import {HttpService, LOGIN_URL} from '@ss/common/api-common';
import {LtmLineService} from './ltm-line.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LTM_LINE_SELECT_URL} from './ltm-api';
import {ShellService} from '@ss/common/ui-shell';

@Injectable({
  providedIn: 'root'
})
export class LtmLineGuard  {
    constructor(private lineSrv: LtmLineService,
                private httpSrv: HttpService,
                private router: Router,
                private shellSrv: ShellService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.lineSrv.line) {
            this.shellSrv.setLabels([{  title: 'LTM_LINE', text: this.lineSrv.line.description }])
        }
        return this.httpSrv
            .init()
            .pipe(map(_ =>  this.lineSrv.line?.id !== null ||
                    this.router.createUrlTree(['/' + LTM_LINE_SELECT_URL])));
    }
}
