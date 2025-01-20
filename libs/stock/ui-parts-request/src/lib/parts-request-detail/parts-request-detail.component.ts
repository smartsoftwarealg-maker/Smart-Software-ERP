import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTransactionDetailComponent } from '@ss/logistics/api-transaction';
import { CCGroup, Lookup } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PartsRequestService } from '../services/parts-request.service';
import { PartsRequestLineService } from '../services/parts-request-line.service';

import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-parts-request-detail',
    standalone: true,
    imports: [CommonModule, DatePickerComponent, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterOutlet, TextFieldModule, UiAutoCompleteComponent],
    templateUrl: './parts-request-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class PartsRequestDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    constructor(public orderService: PartsRequestService,
        public override detailSrv: PartsRequestLineService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected override loginSrv: LoginService,
        protected override dialog: MatDialog) {
        super(orderService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'STOCK_PARTS_REQUEST');
    }

    protected showImportButton(): boolean {
        return false;
    }
    protected requireAgentToImportDocument(): boolean {
        return false;
    }
    protected requireAgent(): boolean {
        return false;
    }
    protected importedDocuments(): Lookup[] {
        return [];
    }
}

