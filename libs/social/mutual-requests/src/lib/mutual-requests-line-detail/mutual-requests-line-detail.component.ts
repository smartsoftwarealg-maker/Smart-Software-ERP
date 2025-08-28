import { Component, inject } from '@angular/core';

import {
    BaseChildEntityDetailComponent,
} from '@ss/common/ui-base-entity';
import {
    MutualRequestLine,
    MutualRequestLineService,
    MutualRequestService,
    SocialEmployeeService
} from '@social/social-api';
import { MaterialModule } from '@ss/common/api-common';

import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { MutualTypeService } from '@social/social-api';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-mutual-requests-line-detail',
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MaterialModule,
    ReactiveFormsModule,
    UiAutoCompleteComponent
],
    templateUrl: './mutual-requests-line-detail.component.html',
    styleUrl: './mutual-requests-line-detail.component.scss'
})
export class MutualRequestsLineDetailComponent extends BaseChildEntityDetailComponent<MutualRequestLine> {
    #rejectionSrv = inject(MutualRequestService);
    #personSrv  = inject(SocialEmployeeService);
    #mutualTypeSrv = inject(MutualTypeService);
    #fb = inject(FormBuilder);

    personLookup = new PersonAutocompleteClass(this.#personSrv);
    mutualTypeLookup = new DefaultAutoCompleteModel(this.#mutualTypeSrv);
    rejectionLookup = new DefaultAutoCompleteModel(this.#rejectionSrv);

    constructor(protected override entitySrv: MutualRequestLineService) {
        super(entitySrv, 'MutualRequestLine');
    }
    override setupForm(e: MutualRequestLine): UntypedFormGroup {
        return this.#fb.group({
            id:          [e.id],
            parentId:    [e.parentId||this.entitySrv.getParentId(), Validators.required],
            folderCount: [e.folderCount, Validators.required],
            employeeId:  [e.employeeId, Validators.required],
            mutualType:  [e.mutualType, Validators.required],
            rejectionId: [e.rejectionId]
        })
    }
}
