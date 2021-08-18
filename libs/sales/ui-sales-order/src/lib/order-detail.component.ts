import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {CCGroup, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {fillObject, LoginService, User} from '@ss/common/api-common';
import {DatePipe} from '@angular/common';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {SalesOrderService} from '@ss/sales/api-sales-order';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {Transaction} from '@ss/logistics/api-transaction';
import {UserListService} from '@ss/common/api-users';

@Component({
  selector: 'ss-ui-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent extends BaseEntityDetailComponent<Transaction> {
    private order: Transaction = null;
    public isManager = false;
    public groups: CCGroup[];
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService)
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination')
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);

  constructor(        public orderService: SalesOrderService,
                      public shellSrv: ShellService,
                      public snackBarSrv: SnackBarService,
                      public route: ActivatedRoute,
                      public formBuilder: FormBuilder,
                      public confirmationSrv: ConfirmationDialogService,
                      public usersService: UserListService,
                      public lookupsSrv: LookupsService,
                      private agentService: AgentService,
                      private loginService: LoginService,
                      private loginSrv: LoginService,
                      private payMethodSrv: PayMethodService) {
      super(orderService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SALES_EDIT_ORDER');
  }

    preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    public setupForm(form: Transaction) {
        // Make sure to update the template if you edit the configuration here
        if (!form.id) {
            form.id = 0;
            form.number = 0;
            form.userID = this.loginService.appCtx.id;
            form.dealer = form.userID;
            form.date = new DatePipe('en').transform(new Date(), 'dd/MM/yyyy');
        }
        this.order = form;
        this.isManager = this.loginService.appCtx.manager;
        return this.formBuilder.group({
            id: [form.id],
            document: [0],
            center: [0],
            date: [form.date, Validators.required],
            number: [form.number, Validators.required],
            payMethod: [form.payMethod, Validators.required],
            reference: [form.reference],
            referenceDocDate: [form.referenceDocDate],
            header: [form.header],
            footer: [form.footer],
            discountDescription: [form.discountDescription],
            fixedDiscount: [form.fixedDiscount || 0.0],
            fixedDiscountVAT: [form.fixedDiscountVAT || 0.0],
            dealer: [{ value: form.dealer || this.loginSrv.appCtx.id, disabled: !this.isManager }, Validators.required],
            agent: [form.agent, Validators.required],
        });
    }
    readForm(): Transaction {
        const form =  super.readForm();
        fillObject(this.order, form)
        return form;
    }

}
