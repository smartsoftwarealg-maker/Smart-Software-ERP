import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { CCGroup, Lookup } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ConsumptionService } from '@ss/stock/api-consumption';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from '@ss/common/api-common';
import { BaseTransactionDetailComponent } from '@ss/logistics/api-transaction';
import { MatDialog } from '@angular/material/dialog';
import { ConsumptionLinesService } from '@ss/stock/api-consumption-lines';


@Component({
    selector: 'ss-consumption-detail',
    templateUrl: './consumption-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss']
})
export class ConsumptionDetailComponent extends BaseTransactionDetailComponent {
    public groups: CCGroup[];

    constructor(
        public consumptionSrv: ConsumptionService,
        public override detailSrv: ConsumptionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected override loginSrv: LoginService,
        protected override dialog: MatDialog) {
        super(consumptionSrv, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'STOCK_EDIT_CONSUMPTION');
    }


    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x));
    }

    protected importedDocuments(): Lookup[] {
        return [];
    }

    protected requireAgent(): boolean {
        return true;
    }

    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected showImportButton(): boolean {
        return false;
    }

    // public override setupForm(b: Transaction) {
    //     // Make sure to update the template if you edit the configuration here
    //     return this.formBuilder.group({
    //         id: [b.id],
    //         document: [0],
    //         centerId: [0 || this.loginSrv.appCtx.center],
    //         date: [b.date || this.langSrv.formatDate(new Date()), Validators.required],
    //         number: [b.number || 0],
    //         reference: [b.reference],
    //         referenceDocDate: [b.referenceDocDate],
    //         header: [b.header],
    //         footer: [b.footer],
    //         dealer: [{ value: b.dealer || this.loginSrv.appCtx.id, disabled: this.loginSrv.appCtx.manager}, Validators.required],
    //         agent: [b.agent, Validators.required],
    //         userID: [this.loginSrv.appCtx.id]
    //     });
    // }
    //
    // override readForm(): Transaction {
    //     const value = super.readForm();
    //     value.dealer = value.dealer || this.loginSrv.appCtx.id;
    //     return value;
    // }
}
