import { Component, inject, ViewChild } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { OrderLinesListComponent } from '@ss/sales/ui-order-lines';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
    UserLookup,
} from '@ss/common/ui-auto-complete';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { QuickOrder } from '../quick-order.api';
import { QuickOrderService } from '../quick-order.service';
import {
    Agent,
    AgentLookupModel,
    AgentService,
    TransporterService,
} from '@ss/logistics/api-agent';
import { UserListService } from '@ss/common/api-users';
import { PayMethodService } from '@ss/logistics/api-logistics-common';
import { PayMethod } from '@ss/common/api-lookup';
import { Project, SalesContractService } from '@ss/logistics/contracts';
import { BaseEntityService } from '@ss/common/api-base-entity';
import {
    ArticleAutoCompleteModel,
    ArticleService,
} from '@ss/master-data/api-article';
import { SalesOrderLinesService } from '@ss/logistics/api-transaction';

@Component({
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateDirective,
        DatePickerComponent,
        UiAutoCompleteComponent,
        RouterOutlet,
    ],
    selector: 'ss-ui-quick-order-detail',
    standalone: true,
    styleUrls: ['./quick-order-detail.component.scss'],
    templateUrl: './quick-order-detail.component.html',
})
export class QuickOrderDetailComponent extends BaseEntityDetailComponent<QuickOrder> {
    @ViewChild(OrderLinesListComponent) orderList: OrderLinesListComponent;
    constructor(
        public override entitySrv: QuickOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'SALES_QUICK_ORDER_DETAIL',
        );
    }
    formId: number;
    #loginSrv = inject(LoginService);
    #agentSrv = inject(AgentService);
    #userSrv = inject(UserListService);
    #payMethodSrv = inject(PayMethodService);
    #salesProjectSrv = inject(SalesContractService);
    #transporterSrv = inject(TransporterService);
    #articleSrv = inject(ArticleService);
    #orderLineSrv = inject(SalesOrderLinesService);

    agentLookup = new AgentLookupModel(this.#agentSrv);
    userLookup = new UserLookup(this.#userSrv);
    payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(
        this.#payMethodSrv,
    );
    salesProjectLookup = new ProjectLookupModel(this.#salesProjectSrv);
    public transporterLookup = new DefaultAutoCompleteModel<Agent>(
        this.#transporterSrv,
        'id',
        'denomination',
    );
    articleLookup: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(
        this.#articleSrv,
    );

    public override setupForm(q: QuickOrder): UntypedFormGroup {
        this.#salesProjectSrv.setParentId(q.agent || 0);
        this.#orderLineSrv.setParentId(q.id || 0);
        this.formId = q.id || 0;
        return this.formBuilder.group({
            id: [q.id],
            centerId: [q.centerId || this.#loginSrv.appCtx.center],
            document: [q.document || 0],
            number: [q.number || 1],
            date: [q.date || new Date(), Validators.required],
            agent: [q.agent],
            userID: [q.userID],
            dealer: [q.dealer],
            payMethod: [q.payMethod],
            locked: [q.locked],
            currency: [q.currency],
            currencyRate: [q.currencyRate || 0, Validators.required],
            dirty: [q.dirty],
            project: [q.project],
            docStatus: [q.docStatus],
            isValidated: [q.isValidated],
            transporter: [q.transporter],
            driver: [q.driver],
            license: [q.license],
            licenseDate: [q.licenseDate],
            licenseIssuer: [q.licenseIssuer],
            plateNumber: [q.plateNumber],
            plateNumber2: [q.plateNumber2],
            reference: [q.reference],
            qty: [q.qty || 0, Validators.required],
        });
    }
}

class ProjectLookupModel extends DefaultAutoCompleteModel<Project> {
    constructor(srv: BaseEntityService<Project>) {
        super(srv);
    }

    override toString = (x: Project) =>
        x ? `${x.contractNo} - ${x.description}` : null;
}
