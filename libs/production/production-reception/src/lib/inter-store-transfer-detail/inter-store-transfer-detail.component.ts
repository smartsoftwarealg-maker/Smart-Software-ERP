import { Component, inject, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup, Validators,
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
import { StoreService } from '@ss/common/api-lookup';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { InterStoreTransferLinesService } from '../interStoreTransfer-lines.service';
import { Observable } from 'rxjs';

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
        UiAutoCompleteComponent
    ]
})
export class InterStoreTransferDetailComponent
    extends BaseEntityDetailComponent<InterStoreTransfer>
    implements OnInit {
    #interStoreTransferLinesSrv = inject(InterStoreTransferLinesService);
    #storeSrv = inject(StoreService);
    #router = inject(Router);

    storeLookup = new DefaultAutoCompleteModel(this.#storeSrv);

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

    override loadEntity(id: number): Observable<InterStoreTransfer> {
        this.#interStoreTransferLinesSrv.setParentId(id||0);
        return super.loadEntity(id);
    }

    override setupForm(e: InterStoreTransfer): UntypedFormGroup {
        return this.formBuilder.group({
            id:        [e.id],
            number:    [{ value: e.number, disabled: true }],
            header:    [e.header],
            date:      [e.date||new Date(), Validators.required],
            storeId:   [e.storeId, Validators.required]
        });
    }

}
