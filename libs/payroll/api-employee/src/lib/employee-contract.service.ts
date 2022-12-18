import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { CONTRACT_PARENT_URL, CONTRACT_CHILD_URL, Contract } from './employee-api';


@Injectable({ providedIn: 'root' })
export class EmployeeContractService extends BaseEntityService<Contract> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CONTRACT_CHILD_URL, CONTRACT_PARENT_URL);
    }

}
