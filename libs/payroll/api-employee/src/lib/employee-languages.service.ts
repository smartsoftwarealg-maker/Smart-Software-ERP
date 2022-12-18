import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { LANGUAGES_PARENT_URL, LANGUAGES_CHILD_URL, EmployeeLanguage } from './employee-api';


@Injectable({ providedIn: 'root' })
export class EmployeeLanguagesService extends BaseEntityService<EmployeeLanguage> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LANGUAGES_CHILD_URL, LANGUAGES_PARENT_URL);
    }
}
