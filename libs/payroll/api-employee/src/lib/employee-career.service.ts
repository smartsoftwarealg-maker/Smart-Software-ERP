import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { CAREER_PARENT_URL, CAREER_CHILD_URL, Career } from './employee-api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class CareerService extends BaseEntityService<Career> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CAREER_CHILD_URL, CAREER_PARENT_URL);
    }

    public getLast(): Observable<Career> {
        return this.getList(0, 1, null, 'from_date')
            .pipe(
                map(x => x.body[0])
            );
    }

}
