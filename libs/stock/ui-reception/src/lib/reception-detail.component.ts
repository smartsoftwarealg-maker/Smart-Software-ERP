import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {CCGroup, LookupsService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Reception, ReceptionService} from "@ss/stock/api-reception";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";
import {User, UserService} from "@ss/common/api-users";
import {Agent, AgentService} from "@ss/logistics/api-agent";


@Component({
    selector: 'ss-reception-detail',
    styleUrls: ['./reception-detail.component.scss'],
    templateUrl: './reception-detail.component.html'
})
export class ReceptionDetailComponent extends BaseEntityDetailComponent<Reception> {

    public groups: CCGroup[];
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService)
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination')

    constructor(
        public receptionService: ReceptionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public usersService: UserService,
        public agentService: AgentService,
        public lookupsSrv: LookupsService) {
        super(receptionService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_RECEPTION');
    }


    preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    public setupForm(b: Reception) {
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
