import { Component } from '@angular/core';
import {
    BaseTransactionDetailComponent,
    DOC_RESERVATION,
    TransactionLinesService,
} from '@ss/logistics/api-transaction';
import { Lookup } from '@ss/common/api-lookup';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
    UntypedFormBuilder,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatCard, MatCardContent } from '@angular/material/card';

import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ProductionReservationService } from '../api/production-reservation.service';

@Component({
    selector: 'ss-product-reservation-detail-detail',
    templateUrl: './production-reservation-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        MatError,
        DatePickerComponent,
        UiAutoCompleteComponent,
        CdkTextareaAutosize,
        RouterOutlet,
    ],
})
export class ProductionReservationDetailComponent extends BaseTransactionDetailComponent {
    constructor(
        public override detailSrv: TransactionLinesService,
        protected override loginSrv: LoginService,
        protected override dialog: MatDialog,
        public override entitySrv: ProductionReservationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            entitySrv,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'PROD_PRODUCTION_RESERVATION',
        );
    }

    protected importedDocuments(): Lookup[] {
        return [];
    }

    protected requireAgent(): boolean {
        return false;
    }

    protected requireAgentToImportDocument(): boolean {
        return false;
    }

    protected showImportButton(): boolean {
        return false;
    }
}
