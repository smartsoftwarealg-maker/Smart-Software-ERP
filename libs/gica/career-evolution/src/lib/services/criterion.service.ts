import { inject, Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { Criterion, GICA_CATEGORIES, GICA_CRITERIA, } from '../gica-careers-api';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Router, UrlTree } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CriterionService extends BaseEntityService<Criterion> {
    private router = inject(Router);
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, GICA_CRITERIA, GICA_CATEGORIES);
    }

    canActivate():
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.getParentId()? true : this.router.createUrlTree(['/app/gica/gica-crieria']);
    }

}
