import {Component, inject} from '@angular/core';

import {BaseChildEntityDetailComponent} from '@ss/common/ui-base-entity';
import {FuelConsumption} from '../vehicle-api';
import {VehicleFuelConsumptionService} from '../services/vehicle-fuel-consumption.service';
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from '@angular/forms';
import {EmployeeService, PersonAutocompleteClass} from '@ss/employee-services/employee-services';
import {FuelTypeService} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel, UiAutoCompleteComponent} from '@ss/common/ui-auto-complete';
import {DatePickerComponent} from '@ss/common/ui-datepicker';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MaterialModule} from '@ss/common/api-common';
import {TranslateDirective} from "@ss/common/ui-lang";

@Component({
    selector: 'ss-vehicle-fuel-consumption-detail',
    standalone: true,
    imports: [
        DatePickerComponent,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialModule,
        ReactiveFormsModule,
        UiAutoCompleteComponent,
        TranslateDirective,
    ],
    templateUrl: './vehicle-fuel-consumption-detail.component.html',
    styleUrls: ['./vehicle-fuel-consumption-detail.component.css'],
})
export class VehicleFuelConsumptionDetailComponent extends BaseChildEntityDetailComponent<FuelConsumption> {
    private personSrv = inject(EmployeeService);
    private fuelSrv = inject(FuelTypeService);
    private fb = inject(FormBuilder);

    personLookup = new PersonAutocompleteClass(this.personSrv);
    fuelLookup = new DefaultAutoCompleteModel(this.fuelSrv);

    constructor(protected override entitySrv: VehicleFuelConsumptionService) {
        super(entitySrv, 'FuelConsumption');
    }

    setupForm(e: FuelConsumption): UntypedFormGroup {
        return this.fb.group({
            id: [e.id],
            parentId: [e.parentId || this.entitySrv.getParentId()],
            date: [e.date, Validators.required],
            driver: [e.driver],
            odoMeter: [e.odoMeter],
            orderNo: [e.orderNo],
            fuelType: [e.fuelType],
        });
    }
}
