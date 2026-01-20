import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
    UntypedFormBuilder,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { Lookup } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {
    BaseTransactionDetailComponent,
    DOC_RESERVATION,
} from '@ss/logistics/api-transaction';
import { MatDialog } from '@angular/material/dialog';
import { MatCard, MatCardContent } from '@angular/material/card';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ProductionConsumptionService } from '../production-consumption.service';
import { ProductionConsumptionLinesService } from '../production-consumption-lines.service';

@Component({
    selector: 'ss-consumption-detail',
    templateUrl: './production-consumption-detail.component.html',
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
        DatePickerComponent,
        CdkTextareaAutosize,
        RouterOutlet,
    ],
})
export class ProductionConsumptionDetailComponent extends BaseTransactionDetailComponent {
    constructor(
        public consumptionSrv: ProductionConsumptionService,
        public override detailSrv: ProductionConsumptionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected override loginSrv: LoginService,
        protected override dialog: MatDialog,
    ) {
        super(
            consumptionSrv,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'STOCK_EDIT_CONSUMPTION',
        );
    }

    protected importedDocuments(): Lookup[] {
        return [{ id: DOC_RESERVATION, description: 'LOGISTICS_RESERVATION' }];
    }

    protected requireAgent(): boolean {
        return false;
    }

    protected requireAgentToImportDocument(): boolean {
        return false;
    }

    protected showImportButton(): boolean {
        return true;
    }
}
