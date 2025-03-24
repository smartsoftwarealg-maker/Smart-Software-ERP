import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { ELine, INPUT_ELEMENTS_URL, Journal, PaymentElement, PSpecial } from '../elements-entry-api';
import { HttpService, PaginationModel } from "@ss/common/api-common";
import { HttpParams } from '@angular/common/http';
import { map, Observable, of, zip } from 'rxjs';
import { InputFilter, InputFiltersService } from '@ss/remuneration/input-filters';
import { ElementsInfo, ElementsInfoService, PElement } from '@ss/remuneration/elementsinfo';

@Injectable({
    providedIn: 'root'
})
export class ElementsEntryService extends BaseEntityService<ELine> {
    readonly VARIABLE_MODE = 1;
    readonly FIXED_MODE = 2;
    readonly INFO_MODE = 3;
    inputFilter: InputFilter[] = [];
    selectedInput = 5;
    selectionMode = 1;
    elements: ElementsInfo[] = [];
    dataCols: ElementsInfo[] = [];
    specialPayroll = false;

    constructor(protected override httpSrv: HttpService,
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

    public colsList(): string[] {
        return this.loadDataCols().map(e => e.field);
    }

    loadDataCols(): ElementsInfo[] {
        const infoMode = (this.selectionMode === this.INFO_MODE);
        const isFixed = (this.selectionMode === this.FIXED_MODE);
        const selection = this.inputFilter.find(e => e.id == this.selectedInput)?.selection || '';

        this.dataCols = this.elements
            .filter(e => selection.indexOf(e.field) >= 0 && e.fixed == isFixed && !infoMode)
            .sort((a, b) => a.description?.localeCompare(b.description) || -1) || [];
        return this.dataCols;
    }

    public colsString(): string {
        return this.colsList().join('') || '';
    }

    override get(id: number | string): Observable<ELine> {
        const params = new HttpParams().set('cols', this.colsString());
        return this.httpSrv.get(this.getUrl() + '/' + id, params);
    }

    getJournal(): Observable<Journal> {
        return this.httpSrv.get('/payroll/journal');
    }

    getSpecialPayrolls(): Observable<PSpecial[]> {
        return this.httpSrv.get<PSpecial[]>('/payroll/special-payrolls');
    }

    getPage(pageModel: PaginationModel, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<ELine[]> {
        return super.getPage(pageModel, filter, sortBy, extraPrams);
    }

    public excel(): Observable<Blob> {
        return this.httpSrv.getBlob('/payroll/excel');
    }

    getInfo(id: number): Observable<PElement> {
        return this.httpSrv.get<PElement>('/payroll/elements/' + id);
    }

    override update(a: ELine): Observable<number> {
        if (this.selectionMode === this.INFO_MODE) {
            const info = {
                id: a.eId,
                employee: 0,
                payMonth: 0,
                center: 0,
                maritalStatus: a.maritalStatus,
                vacationPeriod: 0,
                fund2: a.fund2,
                fund1: a.fund1,
                payMode: a.payMode,
                bank: a.bank,
                accountNo: a.accountNo
            }
            return this.httpSrv.put('/payroll/elements', info);
        } else {
            return super.update(a);
        }
    }
}
