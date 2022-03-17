import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Punishment, PUNISHMENTS_URL} from './punishment-api';
import {HttpService} from '@ss/common/api-common';
import {PERSON_URL} from '../employee-diplomas/employee-diploma-api';

@Injectable({
  providedIn: 'root'
})
export class PunishmentService extends  BaseEntityService<Punishment> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv,  PUNISHMENTS_URL, PERSON_URL);
    }
}
