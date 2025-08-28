import { Component } from '@angular/core';

import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Lookup, LookupsService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    MutualTypeService,
    SocialActivity,
    SocialActivityLookupService,
    SocialActivityService
} from '@social/social-api';

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-mutual-type-detail',
    standalone: true,
    imports: [TranslateDirective, MaterialModule, MatCard, MatCardContent, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
    templateUrl: './mutual-type-detail.component.html',
    styleUrl: './mutual-type-detail.component.scss',
})
export class MutualTypeDetailComponent extends BaseEntityDetailComponent<Lookup> {
    constructor(
        public override entitySrv: MutualTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SOCIAL_MUTUAL_TYPES');
    }

    setupForm(e: Lookup): UntypedFormGroup {
        return this.formBuilder.group({
            id:            [e.id],
            description:   [e.description, [Validators.required, Validators.min(3)]],
            descriptionAr: [e.descriptionAr],
        });
    }
}
