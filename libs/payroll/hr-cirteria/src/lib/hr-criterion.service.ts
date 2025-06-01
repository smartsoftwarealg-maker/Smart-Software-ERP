import { inject, Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Router, UrlTree } from '@angular/router';
import { HrCriterion, HR_CATEGORIES, HR_CRITERIA } from './hr-criteria-api';

@Injectable({
    providedIn: 'root'
})
export class HrCriterionService extends BaseEntityService<HrCriterion> {
    private router = inject(Router);
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, HR_CRITERIA, HR_CATEGORIES);
    }

    canActivate():
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.getParentId()? true : this.router.createUrlTree(['/app/hr/hr-criteria']);
    }

}
