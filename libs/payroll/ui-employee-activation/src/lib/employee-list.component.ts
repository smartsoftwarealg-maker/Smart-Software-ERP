import { Component, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee as IEmployee, EmployeeService, EmployeeActivationService } from '@ss/payroll/api-employee';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ImageModel } from '@ss/common/ui-image-input';
import { HttpService, LanguageService } from '@ss/common/api-common';
import { DefaultReportService } from '@ss/common/ui-default-report-component';

interface Lookup {
    id: number;
    description: string;
}

// frontend only
interface Employee extends IEmployee {
    fullName: string;
    imageModel: ImageModel;
    // turns false when loading is done
    loading: boolean;
    //
    suspended: boolean;
    from: string;
    to: string;
    suspensionReason: number;
    employmentType: number;
}

@Component({
    selector: 'ss-employee-list-activation',
    styleUrls: ['./employee-list.component.scss'],
    templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent extends BaseEntityListComponent<IEmployee> implements OnInit {

    public displayedColumns = [
        'photo',
        'id',
        'fullname',
        'date',
        'employmentType',
        'suspended',
        'suspensionReason'
    ];

    employmentTypes: { [id: number]: string; };
    suspensionReasons: { [id: number]: string; };

    constructor(
        public employeeSrv: EmployeeService,
        public employeeActivationSrv: EmployeeActivationService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public httpSrv: HttpService) {
        super(employeeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'PAYROLL_EMPLOYEE_ACTIVATION_SUSPENSION');
    }

    public preload(): Observable<any> {
        return this.lookupsSrv.getEmploymentTypes()
            .pipe(
                tap(list => this.employmentTypes = this.lookupListToMap(list)),
                switchMap(() => this.lookupsSrv.getSuspensionReasons()),
                tap(list => this.suspensionReasons = this.lookupListToMap(list))
            );
    }

    lookupListToMap(data: Lookup[]): { [id: number]: string; } {
        const map: { [id: number]: string; } = {};
        data.forEach(m => map[m.id] = m.description);
        return map;
    }

    public processLoadedData(data: Employee[]): Observable<Employee[]> {
        return of(data.map(p => {
            // note: formatting the date here means it will not change when the language
            // is changed until the page is refreshed
            p.birthDate = this.langSrv.formatDate(p.birthDate);
            p.fullName = this.langSrv.formatFullName(p.firstName, p.lastName);
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(p.id), false);
            p.loading = true;
            this.employeeActivationSrv.setParentId(p.id);
            // incase of error, keep displaying the loading animation
            this.employeeActivationSrv.getLast()
                .subscribe(x => {
                    p.loading = false;
                    p.employmentType = !!x ? x.employmentType : 0;
                    p.suspensionReason = !!x ? x.suspensionReason : 0;
                    p.from = !!x ? this.langSrv.formatDate(x.hireDate) : null;
                    p.to = !!x ? this.langSrv.formatDate(x.suspensionDate) : null;
                    if (!!x && p.to == null) {
                        p.to = this.langSrv.translate('PAYROLL_TODAY');
                    }
                    p.suspended = !x || x.activityStatus !== 0;
                })
            return p;
        }));
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.addButton.visible = false;
        this.deleteButton.visible = false;
        this.shellSrv.updateShell();
    }
}
