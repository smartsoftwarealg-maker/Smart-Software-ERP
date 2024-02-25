import { Component } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {CCGroup, Lookup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoginService} from '@ss/common/api-common';
import { BaseTransactionDetailComponent, OfferLinesService } from "@ss/logistics/api-transaction";
import {SalesProformaService} from '../sales-proforma.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'ss-proforma-detail',
    templateUrl: './proforma-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class ProformaDetailComponent extends BaseTransactionDetailComponent {

    public groups: CCGroup[];

    constructor(public proformaSrv: SalesProformaService,
                public override detailSrv: OfferLinesService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                public lookupsSrv: LookupsService,
                protected override loginSrv: LoginService,
                protected override dialog: MatDialog) {
        super(proformaSrv, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv,  loginSrv, dialog, 'LOGISTICS_PROFORMA');
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
        return false;
    }

    protected showImportButton(): boolean {
        return false;
    }
}
