import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { RouterModule } from '@angular/router';
import { LookupModule } from '@ss/common/api-lookup';
import { PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { VehicleDriver } from '../vehicle-api';
import { VehicleDriverService } from '../services/vehicle-driver.service';
import { ParkPersonService } from '../services/park-person.service';

@Component({
    selector: 'ss-driver-vehicles-detail',
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
    templateUrl: './vehicles-driver-detail.component.html',
    styleUrls: ['./vehicles-driver-detail.component.css']
})
export class VehiclesDriverDetailComponent extends BaseChildEntityDetailComponent<VehicleDriver> {
    private personSrv = inject(ParkPersonService);
    private vehicleSrv = inject(VehicleService);
    private fb = inject(FormBuilder);
    personLookup = new PersonAutocompleteClass(this.personSrv);

    constructor(protected override entitySrv: VehicleDriverService) {
        super(entitySrv);
    }

    vehicleLookup = new DefaultAutoCompleteModel(this.vehicleSrv);

    setupForm(e: VehicleDriver): UntypedFormGroup {
        return this.fb.group( {
            id:          [e.id],
            parentId:    [e.parentId  || this.entitySrv.getParentId()],
            personId:    [e.personId, Validators.required],
            date:        [e.date, Validators.required],
        });
    }
}

