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
import {
    AppConfigService,
    LoginService,
    MaterialModule,
} from '@ss/common/api-common';
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
import { PayMethod, ShipmentModeService } from '@ss/common/api-lookup';
import { ActiveSalesContractService } from '@ss/logistics/contracts';
import {
    ArticleAutoCompleteModel,
    ArticleService,
} from '@ss/master-data/api-article';
import { SalesOrderLinesService } from '@ss/logistics/api-transaction';
import { PaymentComponent } from '../payment/payment.component';
import { DriverService, SalesDriver } from '@ss/sales/drivers';
import { Observable, switchMap, tap } from 'rxjs';

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
        PaymentComponent,
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
    #salesProjectSrv = inject(ActiveSalesContractService);
    #transporterSrv = inject(TransporterService);
    #articleSrv = inject(ArticleService);
    #orderLineSrv = inject(SalesOrderLinesService);
    #shipmentModeSrv = inject(ShipmentModeService);
    #driverSrv = inject(DriverService);
    #appConfigSrv = inject(AppConfigService);

    agentLookup = new AgentLookupModel(this.#agentSrv);
    driverLookup = new DefaultAutoCompleteModel(this.#driverSrv);
    userLookup = new UserLookup(this.#userSrv);
    payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(
        this.#payMethodSrv,
    );
    salesProjectLookup = new DefaultAutoCompleteModel(this.#salesProjectSrv);

    duplicateMode = signal<DuplicateMode>(DuplicateMode.Count);
    tomorrow: Date = new Date();
    today: Date = new Date(this.tomorrow.getTime() - 24 * 60 * 60 * 1000);
    paymentId: number;
    agentId: number;
    blockedProject = signal(false);
    protected isSchb = signal(false);
    protected isManager = signal(false);
    protected isInvoice = signal(false);

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
        this.agentLookup.onObjectSelected = (a) => {
            this.#salesProjectSrv.setParentId(a?.id || 0);
            this.form?.controls['payMethod'].setValue(a?.payMode || 0);
        };
        this.driverLookup.onObjectSelected = (d) => this.onDriver(d);

        this.salesProjectLookup.onObjectSelected = (p) => {
            this.blockedProject.set(p?.isBlocked || false);
            this.form.controls['project'].setErrors(
                p?.isBlocked ? { blocked: true } : null,
            );
        };
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
        const form = this.formBuilder.group({
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
            discountDescription: [q.discountDescription],
            discount: [{ value: q.discount || 0, disabled: true }],
            fixedDiscountVAT: [q.fixedDiscountVAT || 0],
            paymentId: [q.paymentId],
            driverId: [q.driverId],
        });

        this.paymentId = q.paymentId || 0;
        this.agentId = q.agent;

        if (this.isSchb()) {
            ['license', 'licenseDate', 'licenseIssuer'].forEach((c) =>
                form?.controls[c].disable(),
            );
            this.entitySrv.getInvoiceInfo(q.id + '').subscribe({
                next: (invoiceInfo) => {
                    const isInv = invoiceInfo[0].invoiceNumber > 0;
                    this.isInvoice.set(isInv);
                    if (isInv && !this.isManager()) {
                        form.disable();
                    }
                },
            });
        }

        if (q.id > 0) {
            this.entitySrv.getInvoiceInfo(q.id + '').subscribe((res) => {
                if (res[0].invoiceNumber) {
                    [
                        'project',
                        'agent',
                        'invoiceType',
                        'payMethod',
                        'date',
                    ].forEach((c) => form?.controls[c].disable());
                    this.isInvoice.set(true);
                }
            });
        }

        return form;
    }

    onTabChange(tab: number) {
        this.duplicateMode.set(tab);
        this.form?.controls['duplicateCount'].setValue(0);
        this.form?.controls['from'].setValue(null);
        this.form?.controls['to'].setValue(null);
    }

    private onDriver(d: SalesDriver) {
        this.form?.get('driver')?.setValue(d.description);
        this.form?.get('license')?.setValue(d.licenceNumber);
        this.form?.get('licenseDate')?.setValue(d.licenceDate);
        this.form?.get('licenseIssuer')?.setValue(d.issuedBy);
    }

    override preload(): Observable<unknown> {
        return this.#appConfigSrv.getConfig().pipe(
            tap((conf: { schb: boolean }) => {
                this.isSchb.set(conf?.schb === true);
                this.isManager.set(this.#loginSrv.appCtx.manager)}),
            switchMap((_) => super.preload()),
        );
    }
}
