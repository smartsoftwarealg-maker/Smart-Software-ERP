import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';


export interface DepositType {
    id: number;
    description: string;
    descriptionAr: string;
}

@Injectable({
    providedIn: 'root'
})

export class DepositTypeService extends BaseEntityExtendedService<DepositType> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, '/lookups/deposit_types');
    }
}
