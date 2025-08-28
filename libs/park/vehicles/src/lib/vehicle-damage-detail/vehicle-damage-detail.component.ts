import { Component, inject } from '@angular/core';

import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { VehicleDamage } from '../vehicle-api';
import { VehicleDamageService } from '../services/vehicle-damage.service';
import {
    FormBuilder,
    ReactiveFormsModule,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import {
    EmployeeService,
    PersonAutocompleteClass,
} from '@ss/employee-services/employee-services';

import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import {TranslateDirective} from "@ss/common/ui-lang";
import {MaterialModule} from "@ss/common/api-common";

@Component({
    selector: 'ss-vehicle-damage-detail',
    standalone: true,
    imports: [
        DatePickerComponent,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        UiAutoCompleteComponent,
        TranslateDirective,
        MaterialModule
    ],
    templateUrl: './vehicle-damage-detail.component.html',
    styleUrls: ['./vehicle-damage-detail.component.css'],
})
export class VehicleDamageDetailComponent extends BaseChildEntityDetailComponent<VehicleDamage> {
    private fb = inject(FormBuilder);
    private personSrv = inject(EmployeeService);

    personLookup = new PersonAutocompleteClass(this.personSrv);

    constructor(protected override entitySrv: VehicleDamageService) {
        super(entitySrv, 'VehicleDamage');
    }

    setupForm(e: VehicleDamage): UntypedFormGroup {
        return this.fb.group({
            id: [e.id],
            parentId: [e.parentId || this.entitySrv.getParentId()],
            date: [e.date, Validators.required],
            description: [e.description, Validators.required],
            driverId: [e.driverId, Validators.required],
        });
    }
}
