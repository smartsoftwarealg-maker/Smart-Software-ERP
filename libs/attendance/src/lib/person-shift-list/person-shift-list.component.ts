import { Component, inject } from "@angular/core";
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {PersonShift} from '../attendance-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService, Person} from '@ss/common/api-common';
import {PersonShiftService} from '../person-shift.service';
import {FormControl} from '@angular/forms';
import {PersonAutocompleteClass} from '@ss/payroll-common';
import {Employee, EmployeeService} from '@ss/payroll/api-employee';
import {Lookup, Service, ServiceService} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'ss-person-shift-list',
    templateUrl: './person-shift-list.component.html',
    styleUrls: ['./person-shift-list.component.scss'],
})
export class PersonShiftListComponent extends BaseEntityListComponent<PersonShift> {
    private selectedService = 0;
    private employeeSrv = inject(EmployeeService);
    private serviceSrv = inject(ServiceService);

    employeeCtrl   = new FormControl<number>(this.entitySrv.getParentId());
    serviceCtrl    = new FormControl<number>(0);
    employeeLookup = new PersonAutocompleteClass(this.employeeSrv);
    serviceLookup  = new DefaultAutoCompleteModel(this.serviceSrv);

    displayedColumns = [
        'firstName',
        'lastName',
        'shiftDescription',
        'date',
    ];

    constructor(
        public override entitySrv: PersonShiftService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ATT_SHIFT_ASSIGNMENTS');
        this.pagination.pageSize = 15;
        this.employeeLookup.onObjectSelected = (e) => this.onEmployee(e);
        this.serviceLookup.onObjectSelected = (e) => this.onService(e);
    }

    private onEmployee(e: Employee) {
        this.selectedService = 0;
        this.entitySrv.setParentId(e?.id || 0);
        this.refresh();
    }

    private refreshByService() {
        this.releaseResources();
        this.data = [];
        this.shellSrv.setLoading(this.canShowProcessingStatus());
        this.select(0);
        this.entitySrv
            .getListByService(this.selectedService, this.pagination.page - 1, this.pagination.pageSize)
            .subscribe({
                    next:
                        data => {
                            this.data = data.body;
                            this.pagination.elementCount = data.itemCount;
                            this.shellSrv.setLoading(false); // stop the animation
                        },
                    error:
                        err => {
                            this.data = []; // clear everything;
                            this.shellSrv.setLoading(false); // stop the animation
                            throw err;
                        }
                }
            );
    }

    private onService(e: Service) {
        this.selectedService = e.id || 0;
        this.refreshByService();
    }

    override ngOnInit() {
        super.ngOnInit();
        this.refresh();
    }

    override refresh(callback?: () => void) {
        if (this.selectedService > 0) {
            this.refreshByService();
        } else {
            super.refresh(callback);
        }
    }
}
