import { Component, OnInit } from '@angular/core';
import {Mission} from '../missions-api.class';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MissionsService} from '../missions.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Bank, Fund, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {EmployeeService} from '@ss/payroll/api-employee';
import {UserListService} from '@ss/common/api-users';
import {PayrollUtil, PersonAutocompleteClass} from '@ss/payroll-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {TransportService} from '../zone.service';
import {ZoneService} from '../transport.service';
import {TrajectoryService} from '../trajectory.service';
import {LoginService} from '@ss/common/api-common';

@Component({
    selector: 'ss-mission-preparation-detail',
    templateUrl: './mission-preparation-detail.component.html',
    styleUrls: ['./mission-preparation-detail.component.scss']
})
export class MissionPreparationDetailComponent extends BaseEntityDetailComponent<Mission> {
    employeeAutoCompleteModel = new PersonAutocompleteClass(this.employeeSrv);
    zoneLookup = new DefaultAutoCompleteModel(this.zoneSrv);
    transportLookup = new DefaultAutoCompleteModel(this.transportSrv);
    trajectoryLookup = new DefaultAutoCompleteModel(this.trajectorySrv);

    constructor(
        public detailSrv: MissionsService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public usersService: UserListService,
        private lookupsSrv: LookupsService,
        private employeeSrv: EmployeeService,
        private transportSrv: TransportService,
        private trajectorySrv: TrajectoryService,
        private zoneSrv: ZoneService,
        private loginSrv: LoginService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'MISSION_PREPARATION');
    }

    public setupForm(b: Mission): UntypedFormGroup {
        return this.formBuilder.group({
            id: [b.id],
            number: [b.number],
            center: [b.center || this.loginSrv.appCtx.center],
            employee: [b.employee, Validators.required],
            reference: [b.reference],
            destination: [b.destination, Validators.required],
            thezone: [b.thezone, Validators.required],
            motive: [b.motive, Validators.required],
            duration: [b.duration, Validators.required],
            transport_means: [b.transport_means, Validators.required],
            departure: [new Date(Date.parse(b.departure || new Date() + '') || 0)],
            returnback: [new Date(Date.parse(b.returnback || new Date() + '') || 0)],
            advancement: [b.advancement || 0],
            trajectory: [b.trajectory, Validators.required],
            meals: [b.meals, Validators.required],
            nights: [b.nights, Validators.required],
            mission_status: [b.mission_status || 1, Validators.required],
        });
    }
}
