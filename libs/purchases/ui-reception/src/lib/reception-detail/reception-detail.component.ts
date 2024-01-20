import { Component, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { Lookup } from '@ss/common/api-lookup';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseTransactionDetailComponent, TransactionLinesService } from '@ss/logistics/api-transaction';
import { ReceptionService } from '@ss/purchases/api-reception';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { LogisticsUiStockInfoModule } from '@ss/logistics/ui-stock-info';


@Component({
    selector: 'ss-reception-detail',
    templateUrl: './reception-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiDocInfoModule,
        LogisticsUiStockInfoModule,
        RouterOutlet
    ],
})
export class ReceptionDetailComponent extends BaseTransactionDetailComponent implements OnInit {


    constructor(
        public receptionService: ReceptionService,
        public override detailSrv: TransactionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected readonly loginSrv: LoginService,
        protected dialog: MatDialog) {
        super(receptionService,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'STOCK_EDIT_RECEPTION');
    }

    protected showImportButton(): boolean {
        return true;
    }

    protected requireAgent(): boolean {
        return true;
    }

    // public override setupForm(form: Transaction) {
    //     // Make sure to update the template if you edit the configuration here
    //     return this.formBuilder.group({
    //         id: [form.id],
    //         document: [0],
    //         centerId: [form.centerId || this.loginSrv.appCtx.center],
    //         date: [form.date || new Date(), Validators.required],
    //         number: [{ value: form.number || 0, disabled: true }],
    //         reference: [form.reference],
    //         payMethod: [form.payMethod, Validators.required],
    //         referenceDocDate: [form.referenceDocDate],
    //         header: [form.header],
    //         footer: [form.footer],
    //         discountDescription: [form.discountDescription],
    //         fixedDiscount: [form.fixedDiscount || 0.0],
    //         fixedDiscountVAT: [form.fixedDiscountVAT || 0.0],
    //         dealer: [{ value: form.dealer || this.loginSrv.appCtx.id, disabled: !this.loginSrv.appCtx.manager }],
    //         currency: [form.currency || 10, Validators.required],
    //         currencyRate: [form.currencyRate || 1],
    //         agent: [form.agent, Validators.required]
    //     });
    // }

    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
    }

    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected importedDocuments(): Lookup[] {
        return [{ id: 2, description: 'LOGISTICS_PURCHASE_ORDER' }];
    }
}
