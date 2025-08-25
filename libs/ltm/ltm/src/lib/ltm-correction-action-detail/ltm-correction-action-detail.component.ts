import { Component } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Lookup } from '@ss/common/api-lookup';
import { MaterialModule } from '@ss/common/api-common';
import { LtmCorrectionActionService } from '@ltm/ltm-api';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-correction-action-detail',
    templateUrl: './ltm-correction-action-detail.component.html',
    styleUrls: ['./ltm-correction-action-detail.component.scss'],
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, TranslateDirective],
})
export class LtmCorrectionActionDetailComponent extends BaseEntityDetailComponent<Lookup> {
    constructor(
        public override entitySrv: LtmCorrectionActionService,
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
            'LTM_CORRECTION_ACTIONS',
        );
    }

    public override setupForm(b: Lookup) {
        return this.formBuilder.group({
            id: [b.id],
            description: [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
        });
    }
}
