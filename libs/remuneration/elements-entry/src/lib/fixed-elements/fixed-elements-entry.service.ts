import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ELine, FIXED_ELEMENTS_URL, INPUT_ELEMENTS_URL, Journal, PaymentElement} from '../elements-entry-api';
import {HttpService} from '@ss/common/api-common';
import {HttpParams} from '@angular/common/http';
import {map, Observable, tap, zip} from 'rxjs';
import {InputFilter, InputFiltersService} from '@ss/remuneration/input-filters';
import {ElementsInfo, ElementsInfoService} from '@ss/remuneration/elementsinfo';

@Injectable({
  providedIn: 'root'
})
export class FixedElementsEntryService extends BaseEntityService<ELine> {
    inputFilter: InputFilter[] = [];
    elements: ElementsInfo[] = [];
    dataCols: ElementsInfo[] = [];

    constructor(protected override httpSrv: HttpService,
                private inputFilterSrv: InputFiltersService,
                private elementInfoSrv: ElementsInfoService) {
        super(httpSrv, FIXED_ELEMENTS_URL);
    }

    load(): Observable<any> {
        return this.elementInfoSrv.getList(0, 2000)
                .pipe(tap(res => {
                    this.elements = res.body;
                    this.loadDataCols();
                }));
    }

    public colsList(): string[] {
        return this.loadDataCols().map(e => e.field);
    }


    loadDataCols(): ElementsInfo[] {
        if (this.dataCols.length < 2) {
            this.dataCols = this.elements
                .filter(e => e.fixed === true)
                .sort((a, b) => a.description.localeCompare(b.description));
        }
        return this.dataCols;
    }


    public colsString(): string {
        return this.colsList().join('');
    }

    override get(id: number | string): Observable<ELine> {
        const params = new HttpParams().set('cols', this.colsString());
        return this.httpSrv.get(this.getUrl() + '/' + id, params);
    }

    generateFromIEP(id: number): Observable<{count: number}> {
        return this.httpSrv.put(`/payroll/fix-elements/${id}/iep`);
    }

    generateFromOldElements(id: number): Observable<{count: number}> {
        return this.httpSrv.put(`/payroll/fix-elements/${id}/old-elements`);
    }

    generateFromRank(id: number): Observable<{count: number}> {
        return this.httpSrv.put(`/payroll/fix-elements/${id}/rank`);
    }

    generateFromPost(id: number): Observable<{count: number}> {
        return this.httpSrv.put(`/payroll/fix-elements/${id}/post`);
    }

}
