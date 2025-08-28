import { Component, OnInit } from '@angular/core';
import { BaseTransactionDetailComponent, TransactionLinesService } from '@ss/logistics/api-transaction';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {Lookup} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {MatDialog} from '@angular/material/dialog';
import {ReceptionCancellationService} from '../reception-cancellation.service';
import { MatCard, MatCardContent } from '@angular/material/card';

import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'ss-reception-cancellation-detail',
    templateUrl: './reception-cancellation-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, DatePickerComponent, UiAutoCompleteComponent, MatError, MatTabGroup, MatTab, MatTabLabel, CdkTextareaAutosize, RouterOutlet]
})
export class ReceptionCancellationDetailComponent extends BaseTransactionDetailComponent implements OnInit {

    constructor(
        public override entitySrv: ReceptionCancellationService,
        public override detailSrv: TransactionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected override readonly loginSrv: LoginService,
        protected override dialog: MatDialog) {
        super(entitySrv,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'STOCK_RECEPTION_CANCELLATION');
    }

    protected override showImportButton(): boolean {
        return true;
    }

    protected override requireAgentToImportDocument(): boolean {
        return true;
    }

    protected override requireAgent(): boolean {
        return true;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
    }

    protected importedDocuments(): Lookup[] {
        return [{id: 514, description: 'COMMON_RECEPTION'}];
    }
}
