import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { RouterModule } from '@angular/router';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { Destination, DestinationService } from '@ss/common/api-lookup';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { VehicleMission, VehicleState } from '../vehicle-api';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { VehicleMissionService } from '../services/vehicle-mission.service';
import { VehicleStateService } from '../services/vehicle-state.service';
import { PersonAutocompleteClass, EmployeeService } from '@ss/employee-services/employee-services';
import { ParkPersonService } from '../services/park-person.service';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-vehicle-mission-detail',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        CommonUiDatepickerModule,
        RouterModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule
    ],
    templateUrl: './vehicle-mission-detail.component.html',
    styleUrls: ['./vehicle-mission-detail.component.css']
})
export class VehicleMissionDetailComponent extends BaseChildEntityDetailComponent<VehicleMission> {
    private fb = inject(FormBuilder);
    private driverSrv = inject(ParkPersonService);
    private personSrv = inject(EmployeeService);

    vehicleStatesLookup: DefaultAutoCompleteModel<VehicleState> = null;
    depVehicleStatesLookup: DefaultAutoCompleteModel<VehicleState> = null;
    retVehicleStatesLookup: DefaultAutoCompleteModel<VehicleState> = null;
    signerLookup = new PersonAutocompleteClass(this.personSrv);
    driverLookup = new PersonAutocompleteClass(this.driverSrv);
    destinationLookup: DefaultAutoCompleteModel<Destination> = null;

    constructor(protected override entitySrv: VehicleMissionService) {
        super(entitySrv, 'VehicleMission');
        const vehicleStateSrv = inject(VehicleStateService);
        const destinationService = inject(DestinationService);
        this.vehicleStatesLookup = new DefaultAutoCompleteModel<VehicleState>(vehicleStateSrv);
        this.depVehicleStatesLookup = new DefaultAutoCompleteModel<VehicleState>(vehicleStateSrv);
        this.retVehicleStatesLookup = new DefaultAutoCompleteModel<VehicleState>(vehicleStateSrv);
        this.destinationLookup = new DefaultAutoCompleteModel<Destination>(destinationService);
    }

    setupForm(e: VehicleMission): UntypedFormGroup {
        return this.fb.group({
            id: [e.id],
            parentId: [e.parentId || this.entitySrv.getParentId()],
            centerId: [e.centerId || this.loginSrv.appCtx.center],
            number: [e.number],
            objective: [e.objective],
            missionTime: [e.missionTime],
            returnTime: [e.returnTime],
            destination: [e.destination],
            departOdometer: [e.departOdometer],
            returnOdometer: [e.returnOdometer],
            vehicleState: [e.vehicleState],
            depVehicleState: [e.depVehicleState],
            retVehicleState: [e.retVehicleState],
            signer: [e.signer],
            driver: [e.driver],
            description: [e.description],
            firstName: [e.firstName],
            lastName: [e.lastName],
            depStateDescription: [e.depStateDescription],
            retStateDescription: [e.resStateDescription],
            destinationDescription: [e.destinationDescription],
        });
    }
}
