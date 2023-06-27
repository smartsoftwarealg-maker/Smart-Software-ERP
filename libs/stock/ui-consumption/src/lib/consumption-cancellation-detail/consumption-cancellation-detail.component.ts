import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { CCGroup, Lookup } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ConsumptionCancellationService } from '@ss/stock/api-consumption';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from '@ss/common/api-common';
import { BaseTransactionDetailComponent, DOC_CONSUMPTION } from "@ss/logistics/api-transaction";
import { MatDialog } from '@angular/material/dialog';
import { ConsumptionCancellationLinesService } from '@ss/stock/api-consumption-lines';

@Component({
    selector: 'ss-cancellation-consumption-detail',
    templateUrl: './consumption-cancellation-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class ConsumptionCancellationDetailComponent extends BaseTransactionDetailComponent {
    public groups: CCGroup[];

    constructor(
        public consumptionSrv: ConsumptionCancellationService,
        public override detailSrv: ConsumptionCancellationLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected override loginSrv: LoginService,
        protected override dialog: MatDialog) {
        super(consumptionSrv,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'STOCK_CONSUMPTION_CANCELLATION');
    }


    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x));
    }

    protected importedDocuments(): Lookup[] {
        return [ { id: DOC_CONSUMPTION, description: 'STOCK_CONSUMPTION'}];
    }

    protected requireAgent(): boolean {
        return true;
    }

    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected showImportButton(): boolean {
        return true;
    }
}
