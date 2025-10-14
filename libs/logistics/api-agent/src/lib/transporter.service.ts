import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService, Password} from '@ss/common/api-common';
import {Agent, SUPPLIER_URL, TRANSPORTER_URL} from './agent-api';
import {Observable} from 'rxjs';
import { BaseAgentClass } from './base-agent.class';


@Injectable({
    providedIn: 'root'
})
export class TransporterService extends BaseAgentClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TRANSPORTER_URL);
    }

 }
