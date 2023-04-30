import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {BaseTransactionDetailComponent, Transaction} from '@ss/logistics/api-transaction';
import {ReceptionLinesListComponent} from '@ss/purchases/ui-reception';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LoginService, User} from '@ss/common/api-common';
import {Agent, SupplierService} from '@ss/logistics/api-agent';
import {Currency, CurrencyService, Lookup, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UserListService} from '@ss/common/api-users';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {MatDialog} from '@angular/material/dialog';
import {ReceptionCancellationService} from '../reception-cancellation.service';

@Component({
    selector: 'ss-reception-cancellation-detail',
    templateUrl: './reception-cancellation-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class ReceptionCancellationDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    private currencySrv = inject(CurrencyService);
    private payMethodSrv = inject(PayMethodService);
    public supplierSrv = inject(SupplierService);
    private usersSrv = inject(UserListService);

    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersSrv);
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public currencyCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv);


    constructor(
        public override entitySrv: ReceptionCancellationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        protected override readonly loginSrv: LoginService,
        protected override dialog: MatDialog) {
        super(entitySrv,
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
