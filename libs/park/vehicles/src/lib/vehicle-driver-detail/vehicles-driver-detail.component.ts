import { Component, inject } from '@angular/core';

import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MaterialModule } from '@ss/common/api-common';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { RouterModule } from '@angular/router';
import { PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { VehicleDriver } from '../vehicle-api';
import { VehicleDriverService } from '../services/vehicle-driver.service';
import { ParkPersonService } from '../services/park-person.service';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-driver-vehicles-detail',
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    DatePickerComponent,
    RouterModule,
    DatePickerComponent,
    UiAutoCompleteComponent
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
        super(entitySrv, 'VehicleDriver');
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

