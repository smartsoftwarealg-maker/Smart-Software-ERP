import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ELine} from '../elements-entry-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {HttpService, PaginatorPersistenceService} from '@ss/common/api-common';
import {EmployeeService} from '@ss/payroll/api-employee';
import {Observable, of} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {ImageModel} from '@ss/common/ui-image-input';
import {FixedElementsEntryService} from './fixed-elements-entry.service';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';

@Component({
  selector: 'ss-fixed-elements-list',
  templateUrl: './fixed-elements-list.component.html',
  styleUrls: ['./fixed-elements-list.component.scss']
})
export class FixedElementsListComponent extends BaseEntityListComponent<ELine> {

    private FIXED_COLS = ['photo', 'id', 'firstName', 'lastName', 'post'];

    mainTableWidth = 600;
    displayedColumns = ['photo', 'id', 'firstName', 'lastName', 'post']


    constructor(
        public infoSrv: FixedElementsEntryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService,
        private employeeSrv: EmployeeService,
        private monthSelectorSrv: PayrollMonthService,
        private httpSrv: HttpService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_ELEMENTS_ENTRY');
        this.pagination.pageSize = 15;
    }

    getPage(): Observable<ELine[]> {
        const extraPrams = new HttpParams().set('input', -1).set('fixed', true);
        return this.infoSrv.getPage(this.pagination, super.filter, super.sortBy, extraPrams);
    }

    processLoadedData(data: ELine[]): Observable<ELine[]> {
        this.infoSrv.loadDataCols();
        const colList = this.infoSrv.colsList();
        this.mainTableWidth = 600 + 120 * colList.length;
        this.displayedColumns = this.FIXED_COLS.concat(colList);

        const res = data.map(e => {
            e.imageModel = new ImageModel(this.httpSrv);
            e.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(e.id));
            e.imageModel.readOnly = true;
            return e;
        });
        return of(res);
    }

    ngOnInit() {
        super.ngOnInit();
        // this.deleteButton.visible = false;
        this.addButton.visible = false;
        this.monthSelectorSrv
            .isUpdatableMonth()
            .subscribe(upd => this.editButton.visible = upd);
    }

    preload(): Observable<any> {
        return this.infoSrv.load();
    }
}
