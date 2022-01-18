import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ELine, INPUT_ELEMENTS_URL, Journal, PaymentElement} from './elements-entry-api';
import {HttpService} from '@ss/common/api-common';
import {HttpParams} from '@angular/common/http';
import {map, Observable, zip} from 'rxjs';
import {InputFilter, InputFiltersService} from '@ss/remuneration/input-filters';
import {ElementsInfo, ElementsInfoService} from '@ss/remuneration/elementsinfo';
import {EMPLOYEE_PHOTO_URL, EMPLOYEES_URL} from '@ss/payroll/api-employee';

@Injectable({
  providedIn: 'root'
})
export class ElementsEntryService extends BaseEntityService<ELine> {
    inputFilter: InputFilter[] = [];
    selectedInput = 5;
    selectionMode = 1;
    elements: ElementsInfo[] = [];
    dataCols: ElementsInfo[] = [];

    constructor(protected httpSrv: HttpService,
                private inputFilterSrv: InputFiltersService,
                private elementInfoSrv: ElementsInfoService) {
        super(httpSrv, INPUT_ELEMENTS_URL);
    }

    getSlip(id: number): Observable<PaymentElement[]> {
        const params = new HttpParams().set('id', id + '');
        return this.httpSrv
            .getData<PaymentElement>('/payroll/slip', 0, 1000, null, null, params)
            .pipe(map(res => res.body));
    }

    load() {
        if (this.inputFilter.length == 0 || this.elements.length == 0) {
            zip(this.inputFilterSrv.getList(0, 50),
                this.elementInfoSrv.getList(0, 2000))
                .subscribe(res => {
                    this.inputFilter = res[0].body;
                    this.elements = res[1].body;
                });
        }
    }

    loadDataCols(): ElementsInfo[] {
        const isFixed = (this.selectionMode === 2);
        const selection = this.inputFilter.find(e => e.id == this.selectedInput)?.selection || '';

        this.dataCols = this.elements
                .filter(e => selection.indexOf(e.field) >= 0 && e.fixed == isFixed)
                .sort((a, b) => a.description.localeCompare(b.description)) || [];
        return this.dataCols;
    }

    public colsList(): string[] {
        return this.loadDataCols().map(e => e.field);
    }

    public colsString(): string {
        return this.colsList().join('') || '';
    }

    get(id: number | string): Observable<ELine> {
        const params = new HttpParams().set('cols', this.colsString());
        return this.httpSrv.get(this.getUrl() + '/' + id, params);
    }

    getJournal(): Observable<Journal> {
        return this.httpSrv.get('/payroll/journal');
    }
}
