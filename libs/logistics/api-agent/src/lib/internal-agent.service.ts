import {Injectable} from '@angular/core';
import {HttpService, Password} from '@ss/common/api-common';
import {Agent, CUSTOMER_URL, INTERNAL_URL} from './agent-api';
import { BaseAgentClass } from './base-agent.class';


@Injectable({
    providedIn: 'root'
})
export class InternalAgentService extends BaseAgentClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, INTERNAL_URL);
    }
 }
