import { Component, OnInit } from '@angular/core';
import { BaseTransactionDetailComponent, TransactionLinesService } from "@ss/logistics/api-transaction";
import {CCGroup, Lookup} from '@ss/common/api-lookup';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TransferReceptionService} from '../transfer-reception.service';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'ss-transfer-reception-detail',
    templateUrl: './transfer-reception-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, DatePickerComponent, UiAutoCompleteComponent, MatTabGroup, MatTab, MatTabLabel, CdkTextareaAutosize, RouterOutlet]
})
export class TransferReceptionDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    constructor(
        protected override loginSrv: LoginService,
        protected override dialog: MatDialog,
        public transferService: TransferReceptionService,
        public override detailSrv: TransactionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(transferService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'STOCK_TRANSFER_RECEPTIONS');
    }

    protected showImportButton(): boolean {
        return false;
    }
    protected requireAgentToImportDocument(): boolean {
        return true;
    }
    protected requireAgent(): boolean {
        return true;
    }
    protected importedDocuments(): Lookup[] {
        return [];
    }

}
