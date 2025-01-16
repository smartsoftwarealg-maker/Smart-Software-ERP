import { Component, inject, OnInit } from '@angular/core';
import {BaseTransactionDetailComponent, Transaction} from '@ss/logistics/api-transaction';
import { CCGroup, DeliveryTimeService, Lookup, LookupsService, PayMethod } from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { LoginService, MaterialModule, User } from '@ss/common/api-common';
import { Agent, AgentService, SupplierService } from '@ss/logistics/api-agent';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UserListService} from '@ss/common/api-users';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {PurchaseRequestService} from '../purchase-request.service';
import {MatDialog} from '@angular/material/dialog';
import { PurchaseRequestLinesService } from "../purchase-request-lines.service";
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'ss-purchase-request-detail',
    templateUrl: './purchase-request-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, DatePickerComponent, UiAutoCompleteComponent, MatError, CdkTextareaAutosize, RouterOutlet]
})
export class PurchaseRequestDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    #deliveryTimeSrv = inject(DeliveryTimeService);

    groups: CCGroup[];
    deliveryTimeLookup = new DefaultAutoCompleteModel(this.#deliveryTimeSrv);


    constructor(public orderService: PurchaseRequestService,
        public override detailSrv: PurchaseRequestLinesService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                protected override loginSrv: LoginService,
                protected override dialog: MatDialog) {
        super(orderService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'PURCHASES_PURCHASE_REQUEST');
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x));
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
