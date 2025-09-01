import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Lookup } from '@ss/common/api-lookup';
import { MailingListService } from '../mailing-list.service';
import { MailingLineListService } from '../mailing-line-list.service';


@Component({
    selector: 'ss-crm-teams-list-detail',
    templateUrl: 'mailing-list-detail.component.html',
    styleUrl: 'crm-teams-list-detail.component.scss',
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
        RouterOutlet
    ]
})
export class MailingListDetailComponent extends BaseEntityDetailComponent<Lookup> {
    private mailingSrv = inject(MailingLineListService);
    constructor(
        public override entitySrv: MailingListService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
    ) {
        super(
          entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'COMMON_MAILING_LIST_DETAIL',
        );
    }

    public override setupForm(e: Lookup): UntypedFormGroup {
        this.mailingSrv.setParentId(e.id || 0);
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
        });
    }
}
