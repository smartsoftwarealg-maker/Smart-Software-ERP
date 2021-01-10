import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {CCGroup, LookupsService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Consumption, ConsumptionService} from "@ss/stock/api-consumption";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";
import {User, UserService} from "@ss/common/api-users";
import {Agent, AgentService} from "@ss/logistics/api-agent";


@Component({
    selector: 'ss-consumption-detail',
    styleUrls: ['./consumption-detail.component.scss'],
    templateUrl: './consumption-detail.component.html'
})
export class ConsumptionDetailComponent extends BaseEntityDetailComponent<Consumption> {

    public groups: CCGroup[];
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService);
    // fixme: use a model that shows both the agent-code and the denomination
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination');

    constructor(
        public consumptionService: ConsumptionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public usersService: UserService,
        public agentService: AgentService,
        public lookupsSrv: LookupsService) {
        super(consumptionService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_CONSUMPTION');
    }


    preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    public setupForm(b: Consumption) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            document: [0],
            center: [0],
            date: [b.date, Validators.required],
            number: [b.number, Validators.required],
            reference: [b.reference],
            referenceDocDate: [b.referenceDocDate],
            header: [b.header],
            footer: [b.footer],
            dealer: [b.dealer, Validators.required],
            agent: [b.agent, Validators.required]
        });
    }

}
