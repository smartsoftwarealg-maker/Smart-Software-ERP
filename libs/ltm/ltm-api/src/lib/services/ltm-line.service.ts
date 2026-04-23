import {Injectable, Input} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {LTM_LINE_URL, LTMLine} from '../ltm-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class LtmLineService extends BaseEntityService<LTMLine> {
    private _line: LTMLine = null;
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_LINE_URL);
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    set line(l: LTMLine) {
        this._line = l;
    }

    get line() {
        return this._line;
    }
}
