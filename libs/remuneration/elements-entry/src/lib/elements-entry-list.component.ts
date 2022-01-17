import {Component} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ELine, MJournal, PaymentElement} from './elements-entry-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {ElementsEntryService} from './elements-entry.service';
import {Observable, of} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {MatSelectChange} from '@angular/material/select';


@Component({
  selector: 'ss-elements-entry-list',
  templateUrl: './elements-entry-list.component.html',
  styleUrls: ['./elements-entry-list.component.scss', './common-css.scss']
})
export class ElementsEntryListComponent extends BaseEntityListComponent<ELine> {
    private readonly JOURNAL_IDX = 2;
    private FIXED_COLS = ['id', 'firstName', 'lastName', 'post'];
    private FIXED_JOURNAL_HEADERS = ['id', 'firstName', 'lastName'];

    tableWidth = 600;

    slipColumns      = ['formula', 'description', 'base', 'rate', 'value'];
    displayedColumns = ['id', 'firstName', 'lastName', 'post']
    journalColumns = this.FIXED_JOURNAL_HEADERS;

    paySlip: PaymentElement[] = [];
    journalData: MJournal[] = [];
    headers: string[] = [];

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

    onTabChange(index: number) {
        if (this.JOURNAL_IDX === index) {
            this.infoSrv
                .getJournal()
                .subscribe(res => {
                    this.journalData = res.data;
                    this.headers = res.headers;
                    this.journalColumns = this.FIXED_JOURNAL_HEADERS.concat(res.headers);

                    console.log(this.headers);
                });
        }
    }
}
