import {Injectable} from '@angular/core';
//import {BaseEntityService} from '@ss/common/api-base-entity';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Smtp, SMTPS_URL} from './smtp-api';

@Injectable({
    providedIn: 'root'
})
export class SmtpService extends BaseEntityService<Smtp>{

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, SMTPS_URL);
    }

}
