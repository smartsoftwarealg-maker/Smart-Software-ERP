import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { IEmployee } from '@ss/employee-services/employee-services';

@Injectable({
    providedIn: 'root'
})

export class CmmsPersonService extends BaseEntityService<IEmployee> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/cmms/persons');
    }
}
