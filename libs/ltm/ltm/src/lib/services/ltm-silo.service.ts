import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {LTMMatter} from '../ltm-api';
import {HttpService} from '@ss/common/api-common';
import { Observable } from "rxjs";
import { Lookup } from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class LTMSiloService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lookups/ltm_silos');
    }
}
