import { Component, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { InterStoreTransfer } from '@ss/logistics/api-transaction';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { TranslateDirective } from '@ss/common/ui-lang';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { InterStoreTransferService } from '../interStoreTransfer.service';

@Component({
    selector: 'ss-production-inter-store-transfer-detail',
    templateUrl: './inter-store-transfer-detail.component.html',
    styleUrl: './inter-store-transfer-detail.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        DatePickerComponent,
        RouterOutlet,
    ],
})
export class InterStoreTransferDetailComponent
    extends BaseEntityDetailComponent<InterStoreTransfer>
    implements OnInit
{
    constructor(
        public override entitySrv: InterStoreTransferService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected readonly loginSrv: LoginService,
        protected dialog: MatDialog,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'PROD_INTER_STORE_TRANSFER_DETAIL',
        );
    }

    override setupForm(e: InterStoreTransfer): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            number: [e.number],
            reference: [e.reference],
            date: [e.date],
        });
    }
}
