import { inject, Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Fault, GICA_EMPLOYEES, GICA_FAULTS } from '../gica-careers-api';
import { HttpService } from '@ss/common/api-common';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FaultService extends BaseEntityService<Fault> {
    private router = inject(Router);

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, GICA_FAULTS, GICA_EMPLOYEES);
    }

    canActivate():
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.getParentId()? true : this.router.createUrlTree(['/app/gica/gica-faults']);
    }

}
