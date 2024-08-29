import { inject, Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Quantities, SS_AGENTS, SS_PROJECT_URL, SSProject } from '@ss/scheduled-sales/api-scheduled-sales';
import {HttpService} from '@ss/common/api-common';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseEntityService<SSProject> {
    private router    = inject(Router);

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SS_PROJECT_URL, SS_AGENTS);
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.getParentId() > 0 ? true : this.router.createUrlTree(['/app/scheduled-sales/ss_projects']);
    }

    getQuantities(id: number): Observable<Quantities> {
        return this.httpSrv.get<Quantities>(`/ssales${SS_PROJECT_URL}/${id}/quantities`);
    }

}
