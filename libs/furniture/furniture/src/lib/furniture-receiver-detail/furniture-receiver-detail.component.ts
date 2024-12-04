import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Bank, BankService} from '@ss/administration/api-bank';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {FurnitureReceiver} from '../furniture-api';
import {FurnitureReceiverService} from '../furniture-receiver.service';
import {LoginService} from '@ss/common/api-common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'ss-furniture-receiver-detail',
    templateUrl: './furniture-receiver-detail.component.html',
    styleUrls: ['./furniture-receiver-detail.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        MatError,
    ],
})
export class FurnitureReceiverDetailComponent extends BaseEntityDetailComponent<FurnitureReceiver> {
    constructor(
        public override entitySrv: FurnitureReceiverService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private loginSrv: LoginService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_RECEIVERS');
    }


    public override setupForm(b: FurnitureReceiver) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            centerId: [b.centerId || this.loginSrv.appCtx.center],
            description: [b.description, Validators.required],
        });
    }
}

