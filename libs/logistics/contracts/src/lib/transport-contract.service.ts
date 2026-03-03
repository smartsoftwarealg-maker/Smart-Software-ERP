import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    CONTRACTS_URL,
    Project,
    TRANSPORTERS_URL
} from './contract-api.class';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class TransportContractService extends BaseEntityService<Project> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CONTRACTS_URL, TRANSPORTERS_URL);
    }
}
