import { Component, inject, OnInit } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Article, Quota, Schedule, ScheduleService} from '@ss/scheduled-sales/api-scheduled-sales';
import { CommonModule, DatePipe } from "@angular/common";
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import {Agent, CustomerService} from '@ss/logistics/api-agent';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {LookupsService} from '@ss/common/api-lookup';
import { LoginService, MaterialModule } from "@ss/common/api-common";
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {switchMap, tap} from 'rxjs';
import {MatSelectChange} from '@angular/material/select';
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";

@Component({
    selector: 'ss-partner-schedule-detail',
    templateUrl: './partner-schedule-detail.component.html',
    styleUrls: ['./partner-schedule-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
    ],
})
export class PartnerScheduleDetailComponent extends BaseEntityDetailComponent<Schedule> {
    private loginSrv  = inject(LoginService);
    private customerSrv  = inject(CustomerService);
    private datePipe = new DatePipe('en');
    userLogin = false;
    public dateFilter = (d: Date | null): boolean => d != null && this.quotas.find(q => this.t(q?.salesDate) === this.t(d)) !== undefined;
    public customerLookup = new DefaultAutoCompleteModel<Agent>(this.customerSrv, 'id', 'denomination')
    public quotas: Quota[] = [];
    public articles: Article[] = [];
    public quantities: number[] = [];
    public balance = 0;
    public qty = 0;
    public remainingQty = 0;
    public price = 0.0;
    public amount = 0.0;

    constructor(
        public override entitySrv: ScheduleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SCH_PARTNER_SCHEDULES');
        this.customerLookup.onObjectSelected = a => this.onCustomer(a?.id || 0);
    }

    t(d: Date) {
        return d? this.datePipe.transform(d, 'yyyy-MM-dd') : '';
    }

    public override setupForm(b: Schedule) {
        const form = this.formBuilder.group({
            id: [b.id],
            parentId: [b.parentId || this.loginSrv.appCtx.agentId, Validators.required],
            salesDate: [b.salesDate, Validators.required],
            productRef: [b.productRef, Validators.required],
            qty: [b.qty, Validators.required],
            plateNumber: [b.plateNumber, Validators.required],
            idNumber: [b.idNumber, Validators.required],
            transporter: [b.transporter, Validators.required],
        });
        this.subscriptions.push(
            form.valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(_ => this.saveButton.disabled = !this.form?.valid || this.balance - this.qty * this.price < 1 || this.remainingQty - this.qty < -1)
        );
        this.saveButton.disabled = b.id < 1;
        return form;
    }

    override finishLoading(e: Schedule) {
        super.finishLoading(e);
        this.userLogin = !this.loginSrv.appCtx.agentId && this.loginSrv.appCtx.id > 0;
        if (e.id) {
            this.entitySrv.setParentId(e.parentId);
            const agentId = e.parentId;
            const schedId = e.id;
            const date = e.salesDate;
            const reference = e.productRef;
            this.qty = e.qty;
            this.price = e.price;
            this.entitySrv
                .getQuotas(e.parentId)
                .pipe(tap(res => this.quotas = res),
                    switchMap(_ => this.entitySrv.getBalance(e.parentId, e.id)),
                    tap(res => this.balance = res),
                    switchMap(_ => this.entitySrv.getQuantities(e.productRef)),
                    tap(res => this.quantities = res.map(e => e.qty)),
                    switchMap(_ => this.entitySrv.getRemainingQty(agentId, schedId, reference, date)),
                    tap(res => this.remainingQty = res))
                .subscribe(_ => {
                    this.onDate(this.t(e.salesDate));
                    this.price = this.articles.find(r => r.reference === e.productRef)?.price1 || 0;
                    this.saveButton.disabled = !this.form?.valid || this.balance - this.qty * this.price < 1 || this.remainingQty - this.qty < -1;
                });
        }
    }

    private onCustomer(id: number) {
        this.entitySrv.setParentId(id);
        this.entitySrv
            .getQuotas(id)
            .pipe(tap(res => this.quotas = res),
                switchMap(_ => this.entitySrv.getBalance(id, this.form.get('id').value)))
            .subscribe(res => this.balance = res);
    }

    onDate(date: string) {
        this.articles = [
            ...new Set(this.quotas
                .filter(q => this.t(q.salesDate) === date)
                .map(q => <Article> {
                    id: q.productId,
                    reference: q.reference,
                    description2: q.description,
                    price1: q.price
                }))];
    }

    onArticle(a: MatSelectChange) {
        this.onArticleRef(a.value);
    }

    private onArticleRef(reference: string) {
        const agentId = this.form.get('parentId').value;
        const schedId = this.form.get('id').value;
        const date    = this.form.get('salesDate').value;
        this.price = this.articles.find(r => r.reference === reference)?.price1 || 0;
        this.entitySrv
            .getQuantities(reference)
            .pipe(tap(res => this.quantities = res.map(e => e.qty)),
                switchMap(_ => this.entitySrv.getRemainingQty(agentId, schedId, reference, date)))
            .subscribe(res => {
                this.remainingQty = res;
                this.saveButton.disabled = !this.form?.valid || this.balance - this.qty * this.price < 1 || this.remainingQty - this.qty < -1;
            });
    }

    onQty(e: MatSelectChange) {
        this.qty = e.value;
        this.saveButton.disabled = !this.form?.valid || this.balance - this.qty * this.price < 1 || this.remainingQty - this.qty < -1;
    }

    override readForm(): Schedule {
        const raw: Schedule = this.form.getRawValue();
        const sched = super.readForm();
        sched.centerId = this.loginSrv.appCtx.id;
        sched.isDesktop = false;
        sched.parentId = raw.parentId;
        sched.serialNumber = 0;
        sched.userId = this.loginSrv.appCtx.id;
        sched.price = this.price;
        sched.canceled = false;
        sched.vat = this.articles.find(a => a.reference === sched.productRef)?.vat || 0.0;
        sched.discount = this.quotas.find(q => this.t(q.salesDate) === this.t(sched.salesDate) && q.reference === sched.productRef)?.discount || 0;
        sched.isPrinted = false;
        sched.is_refund = false;
        sched.brutWeight = 0;
        return sched;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../schedules', this.route);
    }
}
