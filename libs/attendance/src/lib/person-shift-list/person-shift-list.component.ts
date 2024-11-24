import { Component, inject } from "@angular/core";
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {PersonShift} from '../attendance-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService, Person} from '@ss/common/api-common';
import {PersonShiftService} from '../person-shift.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService, IEmployee } from "@ss/employee-services/employee-services";
import {Service, ServiceService} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { PersonAutocompleteClass } from "@ss/employee-services/employee-services";
import { Employee } from '@ss/employee-services/employee-services';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { TranslateDirective } from "../../../../common/ui-lang/src/lib/translate.directive";
import { UiAutoCompleteComponent } from "../../../../common/ui-auto-complete/src/lib/auto-complete.component";
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from "@angular/material/table";
import { PaginationComponent } from "../../../../common/ui-pagination/src/lib/pagination.component";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'ss-person-shift-list',
    templateUrl: './person-shift-list.component.html',
    styleUrls: ['./person-shift-list.component.scss'],
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        TranslateDirective,
        UiAutoCompleteComponent,
        FormsModule,
        ReactiveFormsModule,
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DatePipe,
    ],
})
export class PersonShiftListComponent extends BaseEntityListComponent<PersonShift> {
    private selectedService = 0;
    private employeeSrv = inject(EmployeeService);
    private serviceSrv = inject(ServiceService);

    employeeCtrl   = new FormControl<number>(0);
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
        this.employeeCtrl.setValue(this.entitySrv.getParentId());
    }

    private onEmployee(e: IEmployee) {
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
