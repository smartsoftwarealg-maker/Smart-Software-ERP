import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";

import { MaterialModule } from '@ss/common/api-common';
import { Lookup } from '@ss/common/api-lookup';
import { LtmNormService } from '@ltm/ltm-api';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-norm-detail',
    templateUrl: './ltm-norm-detail.component.html',
    styleUrls: ['./ltm-norm-detail.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
    RouterOutlet
],
})
export class LtmNormDetailComponent extends BaseEntityDetailComponent<Lookup> implements OnInit {
    constructor(
        public override entitySrv: LtmNormService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_NORMS');
    }

    public override setupForm(b: Lookup) {

        return this.formBuilder.group({
            id:            [b.id],
            description:   [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
        });
    }

}
