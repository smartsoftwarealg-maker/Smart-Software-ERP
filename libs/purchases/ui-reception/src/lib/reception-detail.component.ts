import {Component, OnInit, ViewChild} from '@angular/core';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {CCGroup, Currency, CurrencyService, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, SupplierService} from '@ss/logistics/api-agent';
import {BaseTransactionComponent, Transaction} from '@ss/logistics/api-transaction';
import {ReceptionService} from '@ss/purchases/api-reception';
import {LoginService, User} from '@ss/common/api-common';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {UserListService} from '@ss/common/api-users';
import {DocImportComponent, DocImportService} from '@ss/logistics/ui-doc-import';
import {ReceptionLinesListComponent} from './reception-lines-list.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
    selector: 'ss-reception-detail',
    templateUrl: './reception-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss']
})
export class ReceptionDetailComponent extends BaseTransactionComponent implements OnInit {
    @ViewChild(ReceptionLinesListComponent) detail: ReceptionLinesListComponent;

    private reception: Transaction = null;
    public groups: CCGroup[];
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
        public receptionService: ReceptionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public usersSrv: UserListService,
        public supplierSrv: SupplierService,
        public lookupsSrv: LookupsService,
        public readonly loginSrv: LoginService,
        private payMethodSrv: PayMethodService,
        private dialog: MatDialog,
        private docImportService: DocImportService,
        private currencySrv: CurrencyService) {
        super(receptionService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_RECEPTION');
    }


    preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    public setupForm(form: Transaction) {
        // Make sure to update the template if you edit the configuration here
        this.reception = form;
        this.importBtn.disabled = form.agent == null || form.agent === undefined;
        return this.formBuilder.group({
            id: [form.id],
            document: [0],
            centerId: [0],
            date: [form.date || new Date(), Validators.required],
            number: [form.number],
            reference: [form.reference],
            payMethod: [form.payMethod, Validators.required],
            referenceDocDate: [form.referenceDocDate],
            header: [form.header],
            footer: [form.footer],
            discountDescription: [form.discountDescription],
            fixedDiscount: [form.fixedDiscount || 0.0],
            fixedDiscountVAT: [form.fixedDiscountVAT || 0.0],
            dealer: [form.dealer || this.loginSrv.appCtx.id, Validators.required],
            currency: [form.currency || 10, Validators.required],
            currencyRate: [form.currencyRate || 1],
            agent: [form.agent, Validators.required]
        });
    }

    ngOnInit() {
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
                data: { documentList: [ { id: 2, description: 'LOGISTICS_PURCHASE_ORDER' }],
                        agentId: agentId}
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result['document']  && result['number']) {
                    const document = result['document'];
                    const number   = result['number'];
                    this.docImportService
                        .importDoc(document, number, this.reception.id)
                        .pipe(tap(_ => this.detail.loadDetailLines()))
                        .subscribe({
                            next: res => this.snackBarSrv.showMessage('COMMON_SUCCESS'),
                            error: err => this.snackBarSrv.showMessage('COMMON_FAILURE', true)
                        });
                }
            });
        }
    }
}
