import {Component, OnInit, ViewChild} from '@angular/core';
import {ShellService, SnackBarService, ToolbarButton, KeepOnToolbar } from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {CCGroup, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {fillObject, LoginService, User} from '@ss/common/api-common';
import {DatePipe} from '@angular/common';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {MatDialog} from '@angular/material/dialog';
import {DocImportComponent, DocImportService} from '@ss/logistics/ui-doc-import';
import {InvoiceCancellationLinesListComponent} from './invoice-cancellation-lines-list.component';
import {InvoiceCancellationService} from '@ss/sales/api-invoice-cancellation';
import {Transaction} from '@ss/logistics/api-transaction';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {UserListService} from '@ss/common/api-users';


@Component({
    selector: 'ss-invoice-detail',
    styleUrls: ['./invoice-cancellation-detail.component.scss'],
    templateUrl: './invoice-cancellation-detail.component.html'
})
export class InvoiceCancellationDetailComponent extends BaseEntityDetailComponent<Transaction> implements OnInit {
    @ViewChild(InvoiceCancellationLinesListComponent) detail: InvoiceCancellationLinesListComponent;

    private invoice: Transaction = null;
    public isManager = false;
    public groups: CCGroup[];
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService)
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination')
    private importBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.importDocument(),
    }


    constructor(
        public invoiceService: InvoiceCancellationService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public usersService: UserListService,
        public lookupsSrv: LookupsService,
        private agentService: AgentService,
        private loginService: LoginService,
        private dialog: MatDialog,
        private docImportService: DocImportService,
        private payMethodSrv: PayMethodService) {
        super(invoiceService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SALES_EDIT_INVOICE_CANCEL');
    }



    preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.importBtn);
    }

    public setupForm(b: Transaction) {
        // Make sure to update the template if you edit the configuration here
        if (!b.id) {
            b.id = 0;
            b.number = 0;
            b.userID = this.loginService.appCtx.id;
            b.dealer = b.userID;
            b.date = new DatePipe('en').transform(new Date(), 'dd/MM/yyyy');
        }
        this.invoice = b;
        this.isManager = this.loginService.appCtx.manager;
        this.importBtn.disabled = b.agent == null || b.agent === undefined;
        return this.formBuilder.group({
            id: [b.id],
            document: [0],
            center: [0],
            date: [b.date, Validators.required],
            number: [b.number, Validators.required],
            reference: [b.reference],
            payMethod: [b.payMethod, Validators.required],
            referenceDocDate: [b.referenceDocDate],
            header: [b.header],
            footer: [b.footer],
            discountDescription: [b.discountDescription],
            fixedDiscount: [b.fixedDiscount || 0.0],
            fixedDiscountVAT: [b.fixedDiscountVAT || 0.0],
            dealer: [{ value: b.dealer, disabled: !this.isManager }, Validators.required],
            agent: [b.agent, Validators.required],
        });
    }
    readForm(): Transaction {
        const form =  super.readForm();
        fillObject(this.invoice, form)
        return form;
    }

    private importDocument() {
        if (!this.importBtn.disabled) {
            const agentId = this.form.controls['agent'].value;
            const dialogRef = this.dialog.open(DocImportComponent, {
                width: '70%',
                height: '55%',
                data: { documentList: [ { id: 258, description: 'SALES_INVOICE' }],
                        agentId: agentId }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result['document']  && result['number']) {
                    const document = result['document'];
                    const number   = result['number'];
                    this.docImportService
                        .importDoc(document, number, this.invoice.id)
                        .pipe(tap(_ => this.detail.loadInvoiceLines()))
                        .subscribe(res => this.snackBarSrv.showMessage('COMMON_SUCCESS'),
                                   err => this.snackBarSrv.showMessage('COMMON_FAILURE', true))
                }
            });
        }
    }
}
