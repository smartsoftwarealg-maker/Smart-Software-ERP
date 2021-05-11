import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';


export interface DepositType {
    id: number;
    description: string;
    descriptionAr: string;
    commissioned: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class DepositTypeService extends BaseEntityExtendedService<DepositType> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, '/deptypes');
    }
}
