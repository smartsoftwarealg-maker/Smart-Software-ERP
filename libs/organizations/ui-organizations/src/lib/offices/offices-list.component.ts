import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, PaginatorPersistenceService, User, UserService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {AgentService} from '@ss/logistics/api-agent';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Observable, of, forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { EmployeeService } from '@ss/payroll/api-employee';
import { OfficeService, Office } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-offices-list',
    templateUrl: './offices-list.component.html',
    styleUrls: ['./offices-list.component.scss'],
})
export class OfficesListComponent extends BaseEntityListComponent<Office> {

    displayedColumns = [
        'description',
        'responsible'
    ];
    services: { [key: number]: string} = {};

    constructor(
        public officeSrv: OfficeService,
        public employeeSrv: EmployeeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public userSrv: UserService,
        public agentSrv: AgentService,
        public langSrv: LanguageService,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(officeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_OFFICES');
    }

    ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        super.ngOnInit();
        console.log('ngOnInit');
    }

    public processLoadedData(data: Office[]): Observable<Office[]> {
        data.forEach(d =>
            d.responsible
                ? this.employeeSrv.get(d.responsible).subscribe(p => d.responsibleName = this.langSrv.formatFullName(p.firstName, p.lastName))
                : of(null)
        );
        return of(data);
    }

}
