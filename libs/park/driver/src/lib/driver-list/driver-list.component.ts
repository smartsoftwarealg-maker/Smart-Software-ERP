import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Driver } from '../driver-api';
import { Employee } from '@ss/employee-services/employee-services';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupsService } from '@ss/common/api-lookup';
import { HttpService, LanguageService, PaginatorPersistenceService } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { DriverService } from '../services/driver.service';
import { Observable, of } from 'rxjs';
import { CommonUiImageInputModule, ImageModel } from '@ss/common/ui-image-input';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { UiPaginationModule } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-driver-list',
    standalone: true,
    imports: [CommonModule, CommonUiImageInputModule, CommonUiLangModule, MatSortModule, MatTableModule, MatTabsModule, UiPaginationModule],
    templateUrl: './driver-list.component.html',
    styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent extends BaseEntityListComponent<Driver> {
    public displayedColumns = [
        'id',
        'fullname',
        'birth',
        'address',
        'msDescription',
        'post'
    ];

    constructor(
        public driverSrv: DriverService,
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
        super(driverSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'PARK_DRIVER_LIST');
        this.pagination.pageSize = 15;
    }

    public override processLoadedData(data: Employee[]): Observable<Employee[]> {
        return of(data.map(p => {
            // note: formatting the date here means it will not change when the language
            // is changed until the page is refreshed
            p.birthDate = this.langSrv.formatDate(p.birthDate);
            p.fullName = this.langSrv.formatFullName(p.firstName, p.lastName);
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.driverSrv.getPhotoUrl(p.id), false);
            return p;
        }));
    }

    trackByFn(index: number, item: Employee) {
        return item.id;
    }
}
