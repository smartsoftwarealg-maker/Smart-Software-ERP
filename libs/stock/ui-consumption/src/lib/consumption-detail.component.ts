import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {CCGroup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ConsumptionService} from '@ss/stock/api-consumption';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, ConsumerService} from '@ss/logistics/api-agent';
import {LanguageService, LoginService, User} from '@ss/common/api-common';
import {UserListService} from '@ss/common/api-users';
import {Transaction} from '@ss/logistics/api-transaction';


@Component({
    selector: 'ss-consumption-detail',
    templateUrl: './consumption-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss']
})
export class ConsumptionDetailComponent extends BaseEntityDetailComponent<Transaction> {

    public groups: CCGroup[];
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService);
    // fixme: use a model that shows both the agent-code and the denomination
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    manager = this.loginSrv.appCtx.manager;
    constructor(
        private langSrv: LanguageService,
        public consumptionService: ConsumptionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public usersService: UserListService,
        public consumerSrv: ConsumerService,
        public lookupsSrv: LookupsService,
        public readonly loginSrv: LoginService) {
        super(consumptionService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_CONSUMPTION');
    }


    preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    public setupForm(b: Transaction) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            document: [0],
            centerId: [0],
            date: [b.date || this.langSrv.formatDate(new Date()), Validators.required],
            number: [b.number || 0],
            reference: [b.reference],
            referenceDocDate: [b.referenceDocDate],
            header: [b.header],
            footer: [b.footer],
            dealer: [{ value: b.dealer || this.loginSrv.appCtx.id, disabled: this.loginSrv.appCtx.manager}, Validators.required],
            agent: [b.agent, Validators.required],
            userID: [this.loginSrv.appCtx.id]
        });
    }

    readForm(): Transaction {
        const value = super.readForm();
        value.dealer = value.dealer || this.loginSrv.appCtx.id;
        return value;
    }
}
