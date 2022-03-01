import { Component, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee as IEmployee, EmployeeService, Wife, EmployeeWivesService } from '@ss/payroll/api-employee';
import { Observable, of } from 'rxjs';
import { LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ImageModel } from '@ss/common/ui-image-input';
import {HttpService, LanguageService, PaginatorPersistenceService} from '@ss/common/api-common';
import { DefaultReportService } from '@ss/common/ui-default-report-component';

// frontend only
interface Employee extends IEmployee {
    fullName: string;
    imageModel: ImageModel;
    wives: string;
    // turns false when loading is done
    loading: boolean;
}

@Component({
    selector: 'ss-employee-list-wives',
    styleUrls: ['./employee-list.component.scss'],
    templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent extends BaseEntityListComponent<IEmployee> implements OnInit {

    public displayedColumns = [
        'photo',
        'id',
        'fullname',
        'wives'
    ];

    constructor(
        public employeeSrv: EmployeeService,
        public empWivesSrv: EmployeeWivesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public httpSrv: HttpService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(employeeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'PAYROLL_WIVES');
        this.editButton.label = 'PAYROLL_EMPLOYEE_WIVES';
        this.editButton.icon = 'fas fa-file-signature';
    }

    public processLoadedData(data: Employee[]): Observable<Employee[]> {
        return of(data.map(p => {
            // note: formatting the date here means it will not change when the language
            // is changed until the page is refreshed
            p.fullName = this.langSrv.formatFullName(p.firstName, p.lastName);
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(p.id), false);
            p.loading = true;
            this.empWivesSrv.setParentId(p.id);
            // incase of error, keep displaying the loading animation
            this.empWivesSrv.getList(0, 50)
                .subscribe((res: { itemCount: number, body: Wife[] }) => {
                    p.wives = res.body.filter(x => x.notDivorced).map(c => c.name).join(',');
                    p.loading = false;
                });
            return p;
        }));
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.addButton.visible = false;
        this.addButton.disabled = true;
        this.deleteButton.visible = false;
        this.deleteButton.disabled = true;
        this.shellSrv.updateShell();
    }
}
