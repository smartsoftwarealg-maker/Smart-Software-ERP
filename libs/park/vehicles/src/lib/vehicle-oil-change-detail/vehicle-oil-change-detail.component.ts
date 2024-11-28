import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { OilChange } from '../vehicle-api';
import { VehicleOilChangeService } from '../services/vehicle-oil-change.service';

@Component({
    selector: 'ss-vehicle-oil-change-detail',
    standalone: true,
    imports: [
        CommonModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,

        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialModule,
        ReactiveFormsModule],
    templateUrl: './vehicle-oil-change-detail.component.html',
    styleUrls: ['./vehicle-oil-change-detail.component.css']
})
export class VehicleOilChangeDetailComponent extends BaseChildEntityDetailComponent<OilChange>{
    private fb = inject(FormBuilder);

    constructor(protected override entitySrv: VehicleOilChangeService) {
        super(entitySrv, 'OilChange');
    }

    setupForm(e: OilChange): UntypedFormGroup {
        return this.fb.group({
            id:           [e.id],
            parentId:     [e.parentId],
            date:         [e.date, Validators.required],
            nextDate:     [e.nextDate, Validators.required],
            odometer:     [e.odometer],
            nextOdometer: [e.nextOdometer]
        });
    }

}
