import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { DriverVehicle } from '../driver-api';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DriverVehicleService } from '../services/driver-vehicle.service';
import { VehicleService } from '../services/vehicle.service';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { RouterModule } from '@angular/router';
import { TranslateDirective } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-driver-vehicles-detail',
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
    templateUrl: './driver-vehicles-detail.component.html',
    styleUrls: ['./driver-vehicles-detail.component.css']
})
export class DriverVehiclesDetailComponent extends BaseChildEntityDetailComponent<DriverVehicle> {
    private vehicleSrv = inject(VehicleService);
    private fb = inject(FormBuilder);

    constructor(protected override entitySrv: DriverVehicleService) {
        super(entitySrv, 'DriverVehicle');
    }

    vehicleLookup = new DefaultAutoCompleteModel(this.vehicleSrv);

    setupForm(e: DriverVehicle): UntypedFormGroup {
        return this.fb.group( {
            id:          [e.id],
            vehicleId:   [e.vehicleId],
            parentId:    [e.parentId  || this.entitySrv.getParentId()],
            date:        [e.date, Validators.required],
        });
    }
}

