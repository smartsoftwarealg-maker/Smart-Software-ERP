import { Component } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import {CCGroup, Lookup, LookupsService} from '@ss/common/api-lookup';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { BaseTransactionDetailComponent, OfferLinesService } from "@ss/logistics/api-transaction";
import {SalesProformaService} from '../sales-proforma.service';
import {MatDialog} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { SalesProformaLinesService } from '../sales-proforma-lines.service';

@Component({
    selector: 'ss-proforma-detail',
    templateUrl: './proforma-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        UiStockInfoComponent,
        DocInfoComponent
    ],
})
export class ProformaDetailComponent extends BaseTransactionDetailComponent {

    public groups: CCGroup[];

    constructor(public proformaSrv: SalesProformaService,
                public override detailSrv: SalesProformaLinesService,
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
