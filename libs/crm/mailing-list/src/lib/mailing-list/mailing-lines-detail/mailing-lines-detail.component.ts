import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule, FormBuilder
} from '@angular/forms';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { MailingListLine } from '../miling-list-api.class';
import { MailingLineListService } from '../mailing-line-list.service';

@Component({
    selector: 'ss-crm-teams-list-lines-detail',
    templateUrl: 'mailing-lines-detail.component.html',
    styleUrl: 'mailing-lines-detail.component.scss',
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        TranslatePipe
    ]
})
export class MailingLinesDetailComponent extends BaseChildEntityDetailComponent<MailingListLine> {
    private formBuilder = inject(FormBuilder);
    constructor(
        public override entitySrv: MailingLineListService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
    ) {
        super(
            entitySrv,
            'COMMON_MAILING_LIST_DETAIL',
        );
    }

    public override setupForm(e: MailingListLine): UntypedFormGroup {
        return this.formBuilder.group({
            id:             [e.id],
            fullName:       [e.fullName, Validators.required],
            parentId:       [e.parentId || this.entitySrv.getParentId()],
            email:          [e.email, Validators.required],
            mobile:         [e.mobile, Validators.required],
            isUnsubscribed: [e.isUnsubscribed ?? false],
        });
    }

}
