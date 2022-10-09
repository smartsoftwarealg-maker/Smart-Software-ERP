import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Transaction} from '@ss/logistics/api-transaction';
import {CCGroup, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {fillObject, LanguageService, LoginService, User} from '@ss/common/api-common';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UserListService} from '@ss/common/api-users';
import {MatDialog} from '@angular/material/dialog';
import {DocImportService} from '@ss/logistics/ui-doc-import';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {
    TransferReceptionLinesListComponent
} from '../transfer-reception-lines-list/transfer-reception-lines-list.component';
import {TransferReceptionService} from '../transfer-reception.service';
import {BranchService} from '../../../../../logistics/api-agent/src/lib/branch.service';

@Component({
    selector: 'ss-transfer-reception-detail',
    templateUrl: './transfer-reception-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class TransferReceptionDetailComponent extends BaseEntityDetailComponent<Transaction> implements OnInit {
    @ViewChild(TransferReceptionLinesListComponent) detail: TransferReceptionLinesListComponent;

    private delivery: Transaction = null;
    public isManager = false;
    public groups: CCGroup[];

    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService)
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.branchService, 'id', 'denomination')

    constructor(
        private langSrv: LanguageService,
        private loginSrv: LoginService,
        public deliveryService: TransferReceptionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public usersService: UserListService,
        public lookupsSrv: LookupsService,
        private branchService: BranchService,
        private loginService: LoginService) {
        super(deliveryService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SALES_EDIT_DELIVERY');
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    override setupForm(b: Transaction) {
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
        return this.formBuilder.group({
            id: [b.id],
            document: [0],
            centerId: [0],
            date: [b.date || this.langSrv.formatDate(new Date()), Validators.required],
            number: [b.number || 0],
            reference: [b.reference],
            referenceDocDate: [b.referenceDocDate],
            header: [b.header],
            payMethod: [b.payMethod],
            footer: [b.footer],
            discountDescription: [b.discountDescription],
            fixedDiscount: [b.fixedDiscount || 0.0],
            fixedDiscountVAT: [b.fixedDiscountVAT || 0.0],
            dealer: [{ value: b.dealer || this.loginSrv.appCtx.id, disabled: !this.isManager }, Validators.required],
            agent: [b.agent, Validators.required],
        });
    }

    override readForm(): Transaction {
        const form =  super.readForm();
        fillObject(this.delivery, form)
        return form;
    }
}
