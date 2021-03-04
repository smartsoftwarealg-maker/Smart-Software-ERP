import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {RECEPTION_LINES_URL, ReceptionLine} from "./reception-lines-api";
import {RECEPTION_URL} from "@ss/stock/api-reception";


@Injectable({
    providedIn: 'root'
})
export class ReceptionLinesService extends BaseEntityService<ReceptionLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, RECEPTION_LINES_URL,RECEPTION_URL);
    }

}
