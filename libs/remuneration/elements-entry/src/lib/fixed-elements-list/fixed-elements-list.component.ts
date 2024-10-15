import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ELine} from '../elements-entry-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { HttpService, MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import { Observable, of, tap } from 'rxjs';
import {HttpParams} from '@angular/common/http';
import { ImageInputComponent, ImageModel } from '@ss/common/ui-image-input';
import {FixedElementsEntryService} from '../services/fixed-elements-entry.service';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import { EmployeeService } from '@ss/employee-services/employee-services';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { RemunerationInputFiltersModule } from "@ss/remuneration/input-filters";

@Component({
    selector: 'ss-fixed-elements-list',
    templateUrl: './fixed-elements-list.component.html',
    styleUrls: ['./fixed-elements-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        RemunerationInputFiltersModule,
        ImageInputComponent
    ],
})
export class FixedElementsListComponent extends BaseEntityListComponent<ELine> {

    private FIXED_COLS = ['photo', 'id', 'firstName', 'lastName', 'post'];

    mainTableWidth = 600;
    displayedColumns = ['photo', 'id', 'firstName', 'lastName', 'post'];


    constructor(
        public infoSrv: FixedElementsEntryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
        private employeeSrv: EmployeeService,
        private monthSelectorSrv: PayrollMonthService,
        private httpSrv: HttpService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'PAYROLL_FIXED_ELEMENTS');
        this.pagination.pageSize = 5;
    }

    override getPage(): Observable<ELine[]> {
        const extraPrams = new HttpParams().set('input', -1).set('fixed', true);
        return this.infoSrv.getPage(this.pagination, this.filter, this.sortBy, extraPrams);
    }

    override processLoadedData(data: ELine[]): Observable<ELine[]> {
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

    override ngOnInit() {
        super.ngOnInit();
        // this.deleteButton.visible = false;
        this.monthSelectorSrv
            .isUpdatableMonth()
            .subscribe(upd => {
                this.editButton.visible = upd;
                this.deleteButton.visible = upd;
                this.addButton.visible = false;
                this.shellSrv.updateShell();
            });
    }

    override preload(): Observable<any> {
        return this.infoSrv.load();
    }
}
