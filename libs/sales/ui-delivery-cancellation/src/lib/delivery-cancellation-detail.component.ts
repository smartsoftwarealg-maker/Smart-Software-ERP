import {Component, OnInit, ViewChild} from '@angular/core';
import {InvoiceCancellationLinesListComponent} from '@ss/sales/ui-invoice-cancellation';
import {CCGroup, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {ShellService, SnackBarService, ToolbarButton, KeepOnToolbar} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {fillObject, LanguageService, LoginService, User} from '@ss/common/api-common';
import {MatDialog} from '@angular/material/dialog';
import {DocImportComponent, DocImportService} from '@ss/logistics/ui-doc-import';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {DeliveryCancellationLinesListComponent} from './delivery-cancellation-lines-list.component';
import {DeliveryCancellationService} from '@ss/sales/api-delivery-cancellation';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {Transaction} from '@ss/logistics/api-transaction';
import {UserListService} from "@ss/common/api-users";

@Component({
  selector: 'ss-delivery-cancellation-detail',
  templateUrl: './delivery-cancellation-detail.component.html',
  styleUrls: ['./delivery-cancellation-detail.component.scss']
})
export class DeliveryCancellationDetailComponent extends BaseEntityDetailComponent<Transaction> implements OnInit {
    @ViewChild(DeliveryCancellationLinesListComponent) detail: DeliveryCancellationLinesListComponent;

    private delivery: Transaction = null;
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
        private langSrv: LanguageService,
        private loginSrv: LoginService,
        public deliveryService: DeliveryCancellationService,
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
        super(deliveryService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SALES_EDIT_DELIVERY_CANCEL');
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
        this.delivery = b;
        this.isManager = this.loginService.appCtx.manager;
        this.importBtn.disabled = b.agent == null || b.agent === undefined;
        return this.formBuilder.group({
            id: [b.id],
            document: [0],
            centerId: [0],
            date: [b.date || this.langSrv.formatDate(new Date()), Validators.required],
            number: [b.number || 0],
            reference: [b.reference],
            referenceDocDate: [b.referenceDocDate],
            payMethod: [b.payMethod, Validators.required],
            header: [b.header],
            footer: [b.footer],
            discountDescription: [b.discountDescription],
            fixedDiscount: [b.fixedDiscount || 0.0],
            fixedDiscountVAT: [b.fixedDiscountVAT || 0.0],
            dealer: [{ value: b.dealer || this.loginSrv.appCtx.id, disabled: !this.isManager }, Validators.required],
            agent: [b.agent, Validators.required],
        });
    }
    readForm(): Transaction {
        const form =  super.readForm();
        fillObject(this.delivery, form)
        return form;
    }

    private importDocument() {
        if (!this.importBtn.disabled) {
            const agentId = this.form.controls['agent'].value;
            const dialogRef = this.dialog.open(DocImportComponent, {
                width: '70%',
                height: '55%',
                data: { documentList: [ { id: 257, description: 'SALES_DELIVERY' }],
                    agentId: agentId }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result['document']  && result['number']) {
                    const document = result['document'];
                    const number   = result['number'];
                    this.docImportService
                        .importDoc(document, number, this.delivery.id)
                        .pipe(tap(_ => this.detail.loadCancellationLines()))
                        .subscribe(res => this.snackBarSrv.showMessage('COMMON_SUCCESS'),
                            err => this.snackBarSrv.showMessage('COMMON_FAILURE', true))
                }
            });
        }
    }


}
