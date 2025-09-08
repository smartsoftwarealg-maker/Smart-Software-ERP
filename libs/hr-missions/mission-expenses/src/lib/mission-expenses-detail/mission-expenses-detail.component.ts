import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { EmployeeService } from '@ss/employee-services/employee-services';
import { UserListService } from '@ss/common/api-users';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import {LoginService, MaterialModule} from '@ss/common/api-common';
import { Component, inject } from '@angular/core';
import { PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import {TranslateDirective} from "@ss/common/ui-lang";
import {Mission, MissionsService, TrajectoryService, TransportService} from "@ss/hr-missions";
import {JourneyLineService} from "../journey.service";
import {ZoneService} from '@ss/hr-missions';

@Component({
    selector: 'ss-mission-preparation-detail',
    templateUrl: './mission-expenses-detail.component.html',
    styleUrls: ['./mission-expenses-detail.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    ReactiveFormsModule,
    DatePickerComponent,
    TranslateDirective,
    UiAutoCompleteComponent,
    RouterOutlet
],
})
export class MissionExpensesDetailComponent extends BaseEntityDetailComponent<Mission> {
    private employeeSrv = inject(EmployeeService);
    private transportSrv = inject(TransportService);
    private trajectorySrv = inject(TrajectoryService);
    private loginSrv = inject(LoginService);
    private zoneSrv = inject(ZoneService);
    transportLookup = new DefaultAutoCompleteModel(this.transportSrv);
    trajectoryLookup = new DefaultAutoCompleteModel(this.trajectorySrv);
    employeeLookup: PersonAutocompleteClass = new PersonAutocompleteClass(this.employeeSrv);
    journeyLineSrv = inject(JourneyLineService);
    zoneLookup = new DefaultAutoCompleteModel(this.zoneSrv);

    constructor(
        public detailSrv: MissionsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public usersSrv: UserListService,
    ) {
        super(
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'MISSION_EXPENSES',
        );
    }

    public override setupForm(b: Mission): UntypedFormGroup {
        this.journeyLineSrv.setParentId(b.id || 0);
        return this.formBuilder.group({
            id:             [b.id],
            number:         [b.number, Validators.required],
            center:         [b.center || this.loginSrv.appCtx.center],
            employee:       [b.employee, Validators.required],
            reference:      [b.reference],
            destination:    [b.destination, Validators.required],
            theZone:        [b.theZone],
            motive:         [b.motive],
            duration:       [b.duration],
            transportMeans: [b.transportMeans, Validators.required],
            departure:      [new Date(Date.parse(b.departure || new Date() + '') || 0),  ],
            returnBack:     [new Date(Date.parse(b.returnBack || new Date() + '') || 0), ],
            advancement:    [b.advancement || 0],
            trajectory:     [b.trajectory, Validators.required],
            meals:          [b.meals],
            nights:         [b.nights],
            missionStatus:  [b.missionStatus || 1, Validators.required],
            payMonthY:      [Math.floor(b.payMonth / 100)|| new Date().getFullYear(), Validators.required],
            payMonthM:      [(b.payMonth % 100)|| new Date().getMonth() + 1, Validators.required],
        });
    }

    public override readForm(): Mission {
        const formVal = this.form.value;
        const val: Mission = formVal;
        val.payMonth = (+formVal.payMonthY) * 100 + (+formVal.payMonthM);
        delete formVal.payMonthY;
        delete formVal.payMonthM;
        console.log(val);
        return val;
    }
}
