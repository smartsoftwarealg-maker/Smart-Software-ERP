import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {LTMMatter} from './ltm-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class LtmMatterService extends BaseEntityService<LTMMatter> {
    private _editable = true;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/ltm/matters');
    }

    set editable(e: boolean) {
        this._editable = e;
    }

    get editable() {
        return this._editable;
    }
}
