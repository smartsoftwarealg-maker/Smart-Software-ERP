import { Component, inject } from '@angular/core';

import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { EDOHeader } from '@social/social-api';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { EdoHeaderService } from '@social/social-api';
import { EdoLineService } from '@social/social-api';
import { PendingEdoComponent } from '../pending-edo/pending-edo.component';
import { SocialEdoLinesComponent } from '../pending-edo-lines/social-edo-lines.component';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    imports: [
    MaterialModule,
    DatePickerComponent,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    PendingEdoComponent,
    SocialEdoLinesComponent,
    TranslateDirective
],
    selector: 'ss-edo-header-detail',
    standalone: true,
    styleUrl: './social-edo-header-detail.component.scss',
    templateUrl: './social-edo-header-detail.component.html'
})
export class SocialEdoHeaderDetailComponent extends BaseEntityDetailComponent<EDOHeader> {
    #loginSrv = inject(LoginService);
    #edoLineSrv = inject(EdoLineService);

    constructor(
        public override entitySrv: EdoHeaderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SOCIAL_EDO_LIST');
    }

    public override setupForm(b: EDOHeader): UntypedFormGroup {
        this.#edoLineSrv.setParentId(b?.id||0);
        return this.formBuilder.group({
            id:               [b.id],
            centerId:         [{value: b.centerId || this.#loginSrv.appCtx.center, disabled: true}, Validators.required],
            date:             [b.date || new Date(), Validators.required],
            number:           [{ value: b.number||0, disabled: true }],
            description:      [b.description],
        });
    }

}

