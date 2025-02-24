import { Component, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@ss/employee-services/employee-services';
import { Observable, of } from 'rxjs';
import { LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ImageModel } from '@ss/common/ui-image-input';
import { HttpService, LanguageService, PaginatorPersistenceService } from '@ss/common/api-common';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { Employee } from '@ss/employee-services/employee-services';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { TranslateDirective } from '@ss/common/ui-lang';
import { NgFor, NgIf } from '@angular/common';
import { ImageInputComponent } from '@ss/common/ui-image-input';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';


@Component({
    selector: 'ss-employee-list',
    styleUrls: ['./employee-list.component.scss'],
    templateUrl: './employee-list.component.html',
    standalone: true,
    imports: [MatTabGroup, MatTab, MatTabLabel, TranslateDirective, NgFor, ImageInputComponent, NgIf, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class EmployeeListComponent extends BaseEntityListComponent<Employee> implements OnInit {
    activePersonnel = true;
    public displayedColumns = [
        'id',
        'fullname',
        'birth',
        'address',
        'msDescription',
        'post'
    ];

    constructor(
        public employeeSrv: EmployeeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(employeeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'PAYROLL_EMPLOYEES_LIST');
        this.pagination.pageSize = 15;
    }

    trackByFn(index: number, item: Employee) {
        return item.id;
    }

    selectAndEdit(id: number) {
        this.select(id);
        this.edit();
    }
    override ngOnInit(): void {
        this.addButton.visible = this.activePersonnel;
        super.ngOnInit();
        this.shellSrv.setGoBackPath('..', this.route);
        this.route.data.subscribe(data => {
            this.activePersonnel = !!data['active'];
            this.employeeSrv.setMode(this.activePersonnel);
            this.shellSrv.setTitle(this.activePersonnel? 'PAYROLL_EMPLOYEES_LIST' : 'PAYROLL_INACTIVE_EMPLOYEES_LIST');
        });
    }


    public override processLoadedData(data: Employee[]): Observable<Employee[]> {
        return of(data.map(p => {
            // note: formatting the date here means it will not change when the language
            // is changed until the page is refreshed
            p.birthDate = this.langSrv.formatDate(p.birthDate);
            p.fullName = this.langSrv.formatFullName(p.firstName, p.lastName);
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(p.id), false);
            return p;
        }));
    }
}
