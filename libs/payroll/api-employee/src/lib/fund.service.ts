import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Fund, FUNDS_URL} from '@ss/common/api-lookup';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FundService extends BaseEntityService<Fund>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, FUNDS_URL);
    }
    public getFunds(): Observable<Fund[]> {
        return this.httpSrv.get<Fund[]>(FUNDS_URL);
    }
}
