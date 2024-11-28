import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Lookup, LookupsService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MedicalAid, MedicalAidTypesService, SocialActivityService } from '@social/social-api';

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'ss-medical-aids-detail',
    standalone: true,
    imports: [CommonModule,  MatCard, MatCardContent, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
    templateUrl: './medical-aid-types-detail.component.html',
    styleUrl: './medical-aid-types-detail.component.scss',
})
export class MedicalAidTypesDetailComponent extends BaseEntityDetailComponent<MedicalAid> {
    constructor(
        public override entitySrv: MedicalAidTypesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SOCIAL_MEDICAL_AIDS');
    }

    setupForm(e: MedicalAid): UntypedFormGroup {
        return this.formBuilder.group({
            id:            [e.id],
            description:   [e.description, [Validators.required, Validators.min(3)]],
            descriptionAr: [e.descriptionAr],
            value:         [e.value],
        });
    }
}
