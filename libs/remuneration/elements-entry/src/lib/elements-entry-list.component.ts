import {Component} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ELine, PaymentElement} from './elements-entry-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {ElementsEntryService} from './elements-entry.service';
import {Observable, of, tap, zip} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {InputFiltersService} from '@ss/remuneration/input-filters';
import {MatSelectChange} from '@angular/material/select';


@Component({
  selector: 'ss-elements-entry-list',
  templateUrl: './elements-entry-list.component.html',
  styleUrls: ['./elements-entry-list.component.scss', './common-css.scss']
})
export class ElementsEntryListComponent extends BaseEntityListComponent<ELine> {
    private FIXED_COLS = [
        'id',
        'firstName',
        'lastName',
        'post'
    ];

    tableWidth = 600;

    slipColumns      = ['formula', 'description', 'base', 'rate', 'value'];
    displayedColumns = ['id', 'firstName', 'lastName', 'post']

    paySlip: PaymentElement[] = [];

    constructor(
        public infoSrv: ElementsEntryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_ELEMENTS_ENTRY');
        this.pagination.pageSize = 15;
    }

    getPage(): Observable<ELine[]> {
        const mode = this.infoSrv.selectionMode === 1? 'false' : 'true';
        const extraPrams = new HttpParams().set('input', this.infoSrv.selectedInput).set('fixed', mode);
        return this.infoSrv.selectedInput == 0 ? of([]) : this.infoSrv.getPage(this.pagination, null, null, extraPrams);
    }

    processLoadedData(data: ELine[]): Observable<ELine[]> {
        this.infoSrv.loadDataCols();
        const colList = this.infoSrv.colsList();
        this.tableWidth = 600 + 100 * colList.length;
        console.log(colList, this.infoSrv.dataCols);
        this.displayedColumns = this.FIXED_COLS.concat(colList);

        return super.processLoadedData(data);
    }

    ngOnInit() {
        super.ngOnInit();
        this.deleteButton.visible = false;
        this.addButton.visible = false;
        this.infoSrv.load();
    }

    selectInput(ev: MatSelectChange) {
        this.infoSrv.selectedInput = ev.value;
        this.refresh();
    }

    setSelectionMode(mode: number) {
        this.infoSrv.selectionMode = mode === 2? 2 : 1;
        this.refresh();
    }

    select(id: number) {
        super.select(id);
        this.infoSrv.getSlip(id).subscribe(res => {
            this.paySlip = res || [];
        });
    }
}
