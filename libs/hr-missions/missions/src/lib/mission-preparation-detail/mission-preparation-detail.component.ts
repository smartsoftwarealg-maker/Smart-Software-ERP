import {Mission} from '../missions-api.class';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatDatepickerModule } from '@muaazh/angular-datepicker';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'ss-mission-preparation-detail',
    templateUrl: './mission-preparation-detail.component.html',
    styleUrls: ['./mission-preparation-detail.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, UiAutoCompleteComponent, MatDatepickerModule, MatSuffix, MatSelect, MatOption, MatCheckbox]
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
            thezone: [b.theZone, Validators.required],
            motive: [b.motive, Validators.required],
            duration: [b.duration, Validators.required],
            transportMeans: [b.transportMeans, Validators.required],
            departure: [new Date(Date.parse(b.departure || new Date() + '') || 0)],
            returnBack: [new Date(Date.parse(b.returnBack || new Date() + '') || 0)],
            advancement: [b.advancement || 0],
            trajectory: [b.trajectory, Validators.required],
            meals: [b.meals, Validators.required],
            nights: [b.nights, Validators.required],
            missionStatus: [b.missionStatus || 1, Validators.required],
        });
    }
}
