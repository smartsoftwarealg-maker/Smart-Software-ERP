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
import {CommonModule} from "@angular/common";
import {PaginationComponent} from "@ss/common/ui-pagination";
import {TranslateDirective} from "@ss/common/ui-lang";
import {Mission, MissionsService, TrajectoryService, TransportService} from "@ss/hr-missions";
import {ZoneService} from "../../../../missions/src/lib/transport.service";
import {JourneyLineService} from "../journey.service";

@Component({
    selector: 'ss-mission-preparation-detail',
    templateUrl: './mission-expenses-detail.component.html',
    styleUrls: ['./mission-expenses-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule,
        DatePickerComponent,
        TranslateDirective,
        UiAutoCompleteComponent,
        RouterOutlet,
    ],
})
export class MissionExpensesDetailComponent extends BaseEntityDetailComponent<Mission> {
    private employeeSrv = inject(EmployeeService);
    private transportSrv = inject(TransportService);
    private trajectorySrv = inject(TrajectoryService);
    private loginSrv = inject(LoginService);
    transportLookup = new DefaultAutoCompleteModel(this.transportSrv);
    trajectoryLookup = new DefaultAutoCompleteModel(this.trajectorySrv);
    employeeLookup: PersonAutocompleteClass = new PersonAutocompleteClass(this.employeeSrv);
    journeyLineSrv = inject(JourneyLineService);

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
            departure: [
                new Date(Date.parse(b.departure || new Date() + '') || 0),
            ],
            returnBack: [
                new Date(Date.parse(b.returnBack || new Date() + '') || 0),
            ],
            advancement: [b.advancement || 0],
            trajectory: [b.trajectory, Validators.required],
            meals: [b.meals, Validators.required],
            nights: [b.nights, Validators.required],
            missionStatus: [b.missionStatus || 1, Validators.required],
        });
    }
}
