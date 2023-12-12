import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { VehicleDamage } from '../vehicle-api';
import { VehicleDamageService } from '../services/vehicle-damage.service';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { EmployeeService, PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'ss-vehicle-damage-detail',
    standalone: true,
    imports: [CommonModule, CommonUiAutoCompleteModule, CommonUiDatepickerModule, CommonUiLangModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './vehicle-damage-detail.component.html',
    styleUrls: ['./vehicle-damage-detail.component.css']
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
