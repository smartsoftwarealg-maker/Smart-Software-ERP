import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, PaginatorPersistenceService, User, UserService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {AgentService} from '@ss/logistics/api-agent';
import { Office as IOffice, ServiceService, OfficeService } from '@ss/organizations/api-organizations';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Observable, of, forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { EmployeeService } from '@ss/payroll/api-employee';

interface Office extends IOffice {
    responsibleName?: string;
}

@Component({
    selector: 'ss-offices-list',
    templateUrl: './offices-list.component.html',
    styleUrls: ['./offices-list.component.scss'],
})
export class OfficesListComponent extends BaseEntityListComponent<Office> {

    displayedColumns = [
        'description',
        'service',
        'responsible'
    ];
    services: { [key: number]: string} = {};

    constructor(
        public officeSrv: OfficeService,
        public serviceSrv: ServiceService,
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
        super.ngOnInit();
        this.shellSrv.setGoBackPath('..', this.route);
    }

    public preload(): Observable<any> {
        this.officeSrv.setParentId(0);
        this.serviceSrv.setParentId(0);
        return of(null);
    }

    public processLoadedData(data: Office[]): Observable<Office[]> {
        this.services = {};
        return forkJoin(
                data.map(d =>
                    d.responsible
                        ? this.employeeSrv.get(d.responsible)
                            .pipe(tap(p => d.responsibleName = this.langSrv.formatFullName(p.firstName, p.lastName)))
                        : of(null)
                )
        ).pipe(
            switchMap(() => this.serviceSrv.getList(0, 49)),
            tap(divs => divs.body.forEach(e => this.services[e.id] = e.description)),
            switchMap(() => of(data))
        );
    }

}
