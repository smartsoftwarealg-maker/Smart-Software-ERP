import { Component } from '@angular/core';
import {
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
} from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';
import { Language, LanguagesService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

@Component({
    selector: 'ss-language-detail',
    templateUrl: './language-levels-detail.component.html',
    styleUrls: ['./language-levels-detail.component.scss'],
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
export class LanguageDetailComponent extends BaseEntityDetailComponent<Language> {
    constructor(
        public employmentTypeSrv: LanguagesService,
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
            'PAYROLL_LANGUAGE',
        );
    }

    public override setupForm(e: Language): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
        });
    }
}
