import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { ABSENCES_URL, Accident, WORK_ACCIDENT_URL } from '../api-work-stoppage';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class WorkStoppageService extends BaseEntityService<Accident> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, WORK_ACCIDENT_URL, ABSENCES_URL);
    }
}
