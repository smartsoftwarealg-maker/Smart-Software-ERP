import { Component, inject, OnInit, signal } from '@angular/core';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { Lookup } from '@ss/common/api-lookup';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    BaseTransactionDetailComponent,
    Transaction
} from '@ss/logistics/api-transaction';
import { IsParamService, LoginService, MaterialModule } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { ExtraCostService } from '@ss/purchases/extra-costs';
import { Observable, of, switchMap, tap } from 'rxjs';
import {PurchaseInvoiceService} from "../purchase-invoice.service";
import {PurchaseInvoiceLineService} from "../purchase-invoice-line.service";


@Component({
    selector: 'ss-purchase-invoice-detail',
    templateUrl: './purchase-invoice-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        DatePickerComponent,
        RouterOutlet,
        UiAutoCompleteComponent
    ]
})
export class PurchaseInvoiceDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    private isSrv = inject(IsParamService);
    private extraCostSrv = inject(ExtraCostService);
    private URLs = ['./lines-list', './costs-list'];
    private costSrv = inject(ExtraCostService);

    showAccTab = signal(true);

    constructor(
        public override entitySrv: PurchaseInvoiceService,
        public override detailSrv: PurchaseInvoiceLineService,
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
            'PURCHASES_PURCHASE_INVOICE');
    }

    protected showImportButton(): boolean {
        return true;
    }

    protected requireAgent(): boolean {
        return true;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
    }

    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected importedDocuments(): Lookup[] {
        return [{ id: 514, description: 'COMMON_RECEPTION' }];
    }

    override finishLoading(e: Transaction) {
        this.costSrv.setParentId(e?.id);
        super.finishLoading(e);
    }

    onTabChange(idx: number) {
        if (this.saveButton.visible) {
            this.router.navigate([this.URLs[idx]], { relativeTo: this.route }).then();
        }
    }


    override loadEntity(id: number): Observable<Transaction> {
        this.extraCostSrv.setParentId(id||0);
        return super.loadEntity(id);
    }
}
