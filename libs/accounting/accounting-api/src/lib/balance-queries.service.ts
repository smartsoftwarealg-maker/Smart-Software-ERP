import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ACC_ACC_BALANCE_URL, ACC_ACCOUNTING_GL_URL, ACC_ASSET_END_URL, Balance, GL} from './accounting-api';
import {HttpService, PaginationModel} from '@ss/common/api-common';
import {Lookup} from '@ss/common/api-lookup';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BalanceQueryService extends BaseEntityService<Balance> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_ACC_BALANCE_URL);
    }

    getGL(pageModel: PaginationModel, extraPrams?: HttpParams): Observable<{ itemCount: number, body: GL[] }> {
        return this.httpSrv
            .getData<GL>(ACC_ACCOUNTING_GL_URL, pageModel.page - 1, pageModel.pageSize, null, null, extraPrams);
    }
}
