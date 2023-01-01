import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseTransactionDetailComponent, Transaction} from '@ss/logistics/api-transaction';
import {ReceptionLinesListComponent} from '@ss/purchases/ui-reception';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LoginService, User} from '@ss/common/api-common';
import {Agent, SupplierService} from '@ss/logistics/api-agent';
import {Currency, CurrencyService, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UserListService} from '@ss/common/api-users';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {MatDialog} from '@angular/material/dialog';
import {DocImportComponent, DocImportService} from '@ss/logistics/ui-doc-import';
import {switchMap} from 'rxjs/operators';
import {ReceptionCancellationService} from '../reception-cancellation.service';

@Component({
    selector: 'ss-reception-cancellation-detail',
    templateUrl: './reception-cancellation-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class ReceptionCancellationDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    @ViewChild(ReceptionLinesListComponent) detail: ReceptionLinesListComponent;

    private reception: Transaction = null;
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersSrv)
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination')
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public currencyCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv)

    private importBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.importDocument(),
    }

    constructor(
        public override entitySrv: ReceptionCancellationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public usersSrv: UserListService,
        public supplierSrv: SupplierService,
        public lookupsSrv: LookupsService,
        public readonly loginSrv: LoginService,
        private payMethodSrv: PayMethodService,
        private dialog: MatDialog,
        private docImportService: DocImportService,
        private currencySrv: CurrencyService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            'STOCK_RECEPTION_CANCELLATION');
    }


    public override setupForm(form: Transaction) {
        // Make sure to update the template if you edit the configuration here
        this.reception = form;
        this.importBtn.disabled = form.agent == null || form.agent === undefined;
        return this.formBuilder.group({
            id: [form.id],
            document: [0],
            centerId: [form.centerId || this.loginSrv.appCtx.center],
            date: [form.date || new Date(), Validators.required],
            number: [{value: form.number || 0, disabled: true}],
            reference: [form.reference],
            // payMethod: [form.payMethod, Validators.required],
            referenceDocDate: [form.referenceDocDate],
            header: [form.header],
            footer: [form.footer],
            discountDescription: [form.discountDescription],
            fixedDiscount: [form.fixedDiscount || 0.0],
            fixedDiscountVAT: [form.fixedDiscountVAT || 0.0],
            dealer: [{value: form.dealer || this.loginSrv.appCtx.id, disabled: !this.loginSrv.appCtx.manager}],
            currency: [form.currency || 10, Validators.required],
            currencyRate: [form.currencyRate || 1],
            agent: [form.agent, Validators.required]
        });
    }

    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
        this.shellSrv.addButton(this.importBtn);
    }

    private importDocument() {
        if (!this.importBtn.disabled) {
            const agentId = this.form.controls['agent'].value;
            const dialogRef = this.dialog.open(DocImportComponent, {
                width: '70%',
                height: '55%',
                data: {
                    documentList: [{id: 514, description: 'COMMON_RECEPTION'}],
                    agentId: agentId
                }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result['document'] && result['number']) {
                    const document = result['document'];
                    const number = result['number'];
                    this.docImportService
                        .importDoc(document, number, this.reception.id)
                        .pipe(switchMap(_ => this.detail.loadDetailLines()))
                        .subscribe({
                            next: res => {
                                this.snackBarSrv.showMessage('COMMON_SUCCESS');
                                this.shellSrv.setLoading(false);
                            },
                            error: err => {
                                this.snackBarSrv.showMessage('COMMON_FAILURE', true);
                                this.shellSrv.setLoading(false);
                            }
                        });
                }
            });
        }
    }
}
