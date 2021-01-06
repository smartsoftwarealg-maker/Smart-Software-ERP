import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {REPORTS_CATALOG, ReportsCatalog} from "./report-catalog-api";


@Injectable({
    providedIn: 'root'
})
export class ReportCatalogService extends BaseEntityService<ReportsCatalog> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, REPORTS_CATALOG);
    }

}
