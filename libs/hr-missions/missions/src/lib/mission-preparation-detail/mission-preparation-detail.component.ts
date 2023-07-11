import {Mission} from '../missions-api.class';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MissionsService} from '../missions.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { EmployeeService } from '@ss/employee-services/employee-services';
import {UserListService} from '@ss/common/api-users';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {TransportService} from '../zone.service';
import {ZoneService} from '../transport.service';
import {TrajectoryService} from '../trajectory.service';
import {LoginService} from '@ss/common/api-common';
import { Component, inject } from "@angular/core";
import { PersonAutocompleteClass } from "@ss/employee-services/employee-services";

@Component({
    selector: 'ss-mission-preparation-detail',
    templateUrl: './mission-preparation-detail.component.html',
    styleUrls: ['./mission-preparation-detail.component.scss']
})
export class MissionPreparationDetailComponent extends BaseEntityDetailComponent<Mission> {
    // private lookupsSrv  = inject(LookupsService);
    private employeeSrv  = inject(EmployeeService);
    private transportSrv  = inject(TransportService);
    private trajectorySrv  = inject(TrajectoryService);
    private zoneSrv  = inject(ZoneService);
    private loginSrv  = inject(LoginService);
    employeeAutoCompleteModel = new PersonAutocompleteClass(this.employeeSrv);
    zoneLookup = new DefaultAutoCompleteModel(this.zoneSrv);
    transportLookup = new DefaultAutoCompleteModel(this.transportSrv);
    trajectoryLookup = new DefaultAutoCompleteModel(this.trajectorySrv);

    constructor(
        public detailSrv: MissionsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public usersSrv: UserListService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'MISSION_PREPARATION');
    }

    public override setupForm(b: Mission): UntypedFormGroup {
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
