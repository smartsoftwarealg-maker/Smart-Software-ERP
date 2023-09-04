import { Component, inject } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { RouterModule } from '@angular/router';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import { LookupModule } from '@ss/common/api-lookup';
import { BaseChildEntityDetailComponent } from "@ss/common/ui-base-entity";
import { VehicleMission, VehicleState } from "../vehicle-api";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { VehicleMissionService } from "../services/vehicle-mission.service";
import { Agent, SupplierService } from "@ss/logistics/api-agent";
import { VehicleStateService } from '../services/vehicle-state.service';

@Component({
    selector: 'ss-vehicle-mission-detail',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        RouterModule,
        CommonUiAutoCompleteModule,
        LookupModule,
        CommonUiDatepickerModule
    ],
    templateUrl: './vehicle-mission-detail.component.html',
    styleUrls: ['./vehicle-mission-detail.component.css']
})
export class VehicleMissionDetailComponent extends BaseChildEntityDetailComponent<VehicleMission> {
    private fb = inject(FormBuilder);
    vehicleStatesLookup: DefaultAutoCompleteModel<VehicleState> = null;
    depVehicleStatesLookup: DefaultAutoCompleteModel<VehicleState> = null;
    retVehicleStatesLookup: DefaultAutoCompleteModel<VehicleState> = null;

    constructor(protected override entitySrv: VehicleMissionService, protected vehicleStateSrv: VehicleStateService) {
        super(entitySrv);
        this.vehicleStatesLookup = new DefaultAutoCompleteModel<VehicleState>(vehicleStateSrv);
        this.depVehicleStatesLookup = new DefaultAutoCompleteModel<VehicleState>(vehicleStateSrv);
        this.retVehicleStatesLookup = new DefaultAutoCompleteModel<VehicleState>(vehicleStateSrv);
    }

    setupForm(e: VehicleMission): UntypedFormGroup {
        return this.fb.group({
            id: [e.id],
            parentId: [e.parentId || this.entitySrv.getParentId()],
            centerId: [e.centerId || 0], // todo: get default center
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
            plateNumber: [e.plateNumber],
            description: [e.description],
            firstName: [e.firstName],
            lastName: [e.lastName],
            stateDescription: [e.stateDescription],
            depStateDescription: [e.depStateDescription],
            retStateDescription: [e.resStateDescription],
            destinationDescription: [e.destinationDescription],
        });
    }
}
