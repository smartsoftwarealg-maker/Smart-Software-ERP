import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Employee } from '@ss/employee-services/employee-services';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LookupsService } from '@ss/common/api-lookup';
import { HttpService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { Observable, of } from 'rxjs';
import { ImageInputComponent, ImageModel } from '@ss/common/ui-image-input';


import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { CmmsEmployeeService } from '../services/cmms-employee.service';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-cmms-employee-list',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
       
       
        RouterModule,

        PaginationComponent,
        ImageInputComponent
    ],
    templateUrl: './cmms-employee-list.component.html',
    styleUrls: ['./cmms-employee-list.component.scss'],
})
export class CmmsEmployeeListComponent extends BaseEntityListComponent<Employee> implements OnInit {
    public displayedColumns = [
        'id',
        'fullName',
        'birth',
        'address',
        'msDescription',
        'post'
    ];

    constructor(
        public employeeSrv: CmmsEmployeeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public lookupsSrv: LookupsService,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(employeeSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'PAYROLL_EMPLOYEES_LIST');
        this.pagination.pageSize = 15;
    }

    trackByFn(index: number, item: Employee) {
        return item.id;
    }

    override ngOnInit(): void {
        this.addButton.visible = false;
        this.deleteButton.visible = false;
        super.ngOnInit();
        this.shellSrv.setGoBackPath('..', this.route);
    }

    public override processLoadedData(data: Employee[]): Observable<Employee[]> {
        return of(data.map(p => {
            // note: formatting the date here means it will not change when the language
            // is changed until the page is refreshed
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(p.id), false);
            return p;
        }));
    }
}

