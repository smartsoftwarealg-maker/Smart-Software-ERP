import { Component } from '@angular/core';
import {
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
} from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';
import { Lookup, TrnSubjectsService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

@Component({
    selector: 'ss-trn-subjects-detail',
    templateUrl: './trn-subjects-detail.component.html',
    styleUrls: ['./trn-subjects-detail.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
    ],
})
export class TrnSubjectsDetailComponent extends BaseEntityDetailComponent<Lookup> {
    constructor(
        public employmentTypeSrv: TrnSubjectsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
    ) {
        super(
            employmentTypeSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'PAYROLL_EDIT_TRN_SUBJECTS',
        );
    }

    public override setupForm(e: Lookup): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
        });
    }
}
