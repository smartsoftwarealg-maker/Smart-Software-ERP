import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    EDOHeader
} from '@social/social-api';
import { LoginService } from '@ss/common/api-common';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AidHistoryComponent } from '@social/aid-history';
import { EdoHeaderService } from '@social/social-api';
import { EdoLineService } from '@social/social-api';
import { PendingEdoComponent } from '../pending-edo/pending-edo.component';
import { SocialEdoLinesComponent } from '../pending-edo-lines/social-edo-lines.component';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    imports: [
        CommonModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        PaginationComponent,
        MatCard,
        MatCardContent,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        AidHistoryComponent,
        PendingEdoComponent,
        SocialEdoLinesComponent],
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

