import { Component } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { Lookup, LookupsService} from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { BaseTransactionDetailComponent } from "@ss/logistics/api-transaction";
import {SalesProformaService} from '../sales-proforma.service';
import {MatDialog} from '@angular/material/dialog';

import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { SalesProformaLinesService } from '../sales-proforma-lines.service';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-proforma-detail',
    templateUrl: './proforma-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
    RouterModule,
    DatePickerComponent,
    UiAutoCompleteComponent
],
})
export class ProformaDetailComponent extends BaseTransactionDetailComponent {
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
