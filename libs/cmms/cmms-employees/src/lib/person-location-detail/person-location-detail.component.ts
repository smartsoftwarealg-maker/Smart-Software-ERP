import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { PersonLocation } from '../employee-api';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { PersonLocationService } from '../services/person-location.service';
import { AssetLocationService } from '@ss/assets-component';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'ss-person-location-detail',
    standalone: true,
    imports: [CommonModule, CommonUiAutoCompleteModule, CommonUiLangModule, FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, ReactiveFormsModule],
    templateUrl: './person-location-detail.component.html',
    styleUrls: ['./person-location-detail.component.css'],
})
export class PersonLocationDetailComponent extends BaseChildEntityDetailComponent<PersonLocation> {
    private locationSrv = inject(AssetLocationService);
    private fb = inject(FormBuilder);

    locationLookup = new DefaultAutoCompleteModel(this.locationSrv);

    constructor(protected override entitySrv: PersonLocationService) {
        super(entitySrv);
    }

    setupForm(e: PersonLocation): UntypedFormGroup {
        return this.fb.group({
            id:         [e.id],
            parentId:   [e.parentId || this.entitySrv.getParentId()],
            locationId: [e.locationId, Validators.required]
        });
    }
}
