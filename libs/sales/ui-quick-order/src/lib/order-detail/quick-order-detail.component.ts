import { Component, inject, signal, ViewChild } from '@angular/core';
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
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
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
import { PayMethod, ShipmentModeService } from '@ss/common/api-lookup';
import { Project, SalesContractService } from '@ss/logistics/contracts';
import { BaseEntityService } from '@ss/common/api-base-entity';
import {
    ArticleAutoCompleteModel,
    ArticleService,
} from '@ss/master-data/api-article';
import { SalesOrderLinesService } from '@ss/logistics/api-transaction';

export enum DuplicateMode {
    Count = 0,
    DateRange = 1,
}

@Component({
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateDirective,
        DatePickerComponent,
        UiAutoCompleteComponent,
        RouterOutlet,
        TranslatePipe,
    ],
    selector: 'ss-ui-quick-order-detail',
    standalone: true,
    styleUrls: ['./quick-order-detail.component.scss'],
    templateUrl: './quick-order-detail.component.html',
})
export class QuickOrderDetailComponent extends BaseEntityDetailComponent<QuickOrder> {
    formId: number;
    #loginSrv = inject(LoginService);
    #agentSrv = inject(AgentService);
    #userSrv = inject(UserListService);
    #payMethodSrv = inject(PayMethodService);
    #salesProjectSrv = inject(SalesContractService);
    #transporterSrv = inject(TransporterService);
    #articleSrv = inject(ArticleService);
    #orderLineSrv = inject(SalesOrderLinesService);
    #shipmentModeSrv = inject(ShipmentModeService);

    agentLookup = new AgentLookupModel(this.#agentSrv);
    userLookup = new UserLookup(this.#userSrv);
    payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(
        this.#payMethodSrv,
    );
    salesProjectLookup = new ProjectLookupModel(this.#salesProjectSrv);

    duplicateMode = signal<DuplicateMode>(DuplicateMode.Count);

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
        this.agentLookup.onObjectSelected = (a) =>
            this.#salesProjectSrv.setParentId(a?.id || 0);
    }
    public transporterLookup = new DefaultAutoCompleteModel<Agent>(
        this.#transporterSrv,
        'id',
        'denomination',
    );

    articleLookup: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(
        this.#articleSrv,
    );
    shipmentModeLookup = new DefaultAutoCompleteModel(this.#shipmentModeSrv);

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
            duplicateCount: [q.duplicateCount || 0, Validators.max(50)],
            from: [q.from],
            to: [q.to],
            invoiceType: [
                q.invoiceType || 1,
                [Validators.min(1), Validators.max(2)],
            ],
            shipMode: [0],
            altAgent: [q.altAgent],
            footer: [q.footer],
        });
    }

    onTabChange(tab: number) {
        this.duplicateMode.set(tab);
        this.form?.controls['duplicateCount'].setValue(0);
        this.form?.controls['from'].setValue(null);
        this.form?.controls['to'].setValue(null);
    }
}

class ProjectLookupModel extends DefaultAutoCompleteModel<Project> {
    constructor(srv: BaseEntityService<Project>) {
        super(srv);
    }

    override toString = (x: Project) =>
        x ? `${x.contractNo} - ${x.description}` : null;
}
