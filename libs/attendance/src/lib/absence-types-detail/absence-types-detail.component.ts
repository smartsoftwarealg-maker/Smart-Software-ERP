import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { AbsenceType } from '../attendance-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { AbsenceTypesService } from '../absence-types.service';
import { HttpService } from '@ss/common/api-common';
import { ElementInfoLookupModel } from '@ss/remuneration/element-types';
import { ElementsInfoService } from '@ss/remuneration/elementsinfo';

@Component({
    selector: 'ss-absence-types-detail',
    templateUrl: './absence-types-detail.component.html',
    styleUrls: ['./absence-types-detail.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        MatError
    ]
})
export class AbsenceTypesDetailComponent extends BaseEntityDetailComponent<AbsenceType> {
    private httpSrv = inject(HttpService);
    infoLookup = new ElementInfoLookupModel(new ElementsInfoService(this.httpSrv));

    constructor(
        public override entitySrv: AbsenceTypesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ATT_ABSENCE_TYPES',
        );
    }

    public override setupForm(b: AbsenceType) {
        // Make sure to update the template if you edit the configuration here
        let hex = b.color.toString(16);
        hex = '#' + ('000000'+hex).substring(hex.length);
        return this.formBuilder.group({
            id: [b.id],
            description: [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
            letter: [b.letter],
            color: [hex],
            field: [b.field],
        });
    }

    public override readForm(): AbsenceType {
        const abs = this.form.getRawValue();
        const color = parseInt(abs.color.substring(1), 16);
        return {
            description: abs.description,
            letter: abs.letter,
            color: color,
            field: abs.field,
            descriptionAr: abs.descriptionAr,
            id: abs.id,
        };
    }
}
