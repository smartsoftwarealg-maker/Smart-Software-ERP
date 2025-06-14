import { Injectable } from '@angular/core';
import { HttpService, PaginationModel } from '@ss/common/api-common';
import { LOTS_URL, Lot } from './lookups-api';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class LotsService extends BaseEntityExtendedService<Lot> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LOTS_URL);
    }

    getLots(
        reference: string,
        pageModel: PaginationModel,
        filter?: string,
        sortBy?: string) {
        const page = pageModel.page;
        const pageSize = pageModel.pageSize;
        const prams = new HttpParams().append('find', reference);
        return this.httpSrv.getData<Lot>(
            '/articles/lots',
            page,
            pageSize,
            filter,
            sortBy,
            prams,
        );
    }

    protected reference: string = null;

    get getReference() {
        return this.reference;
    }

    setReference(reference: string) {
        this.reference = reference;
    }
}
