import { Component, inject, signal } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {
    Article,
    Schedule,
    ScheduleService,
    SSArticleService,
    SSProject
} from '@ss/scheduled-sales/api-scheduled-sales';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {LookupsService} from '@ss/common/api-lookup';
import { LoginService, MaterialModule } from "@ss/common/api-common";
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import {Agent, CustomerService} from '@ss/logistics/api-agent';
import { CommonModule, DatePipe } from "@angular/common";
import {MatSelectChange} from '@angular/material/select';
import {switchMap, tap} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';


import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { ProjectService } from '@ss/scheduled-sales/projects';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

// type Article = { id: number, reference: string, description: string};

@Component({
    selector: 'ss-sales-schedule-detail',
    templateUrl: './sales-schedule-detail.component.html',
    styleUrls: ['./sales-schedule-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        TranslatePipe
    ]
})
export class SalesScheduleDetailComponent extends BaseEntityDetailComponent<Schedule> {
    private loginSrv    = inject(LoginService);
    private customerSrv = inject(CustomerService);
    private projectSrv  = inject(ProjectService);
    private articleSrv  = inject(SSArticleService);
    private datePipe = new DatePipe('en');

    readonly customerLookup = new DefaultAutoCompleteModel<Agent>(this.customerSrv, 'id', 'denomination')
    public quantities= signal<number[]>([]);
    public discounts = signal<number[]>([0]);
    public vats = signal<number[]> ([0, 19.0]);
    public balance = signal(0);
    public qty = signal(0);
    public remainingQty = signal(0);
    public price = signal(0.0);

    articleLookup = new DefaultAutoCompleteModel(this.articleSrv, 'reference', 'description2');
    projectLookup = new DefaultAutoCompleteModel(this.projectSrv);

    constructor(
        public override entitySrv: ScheduleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SCH_SCHEDULES');
        this.customerLookup.onObjectSelected = a => this.onCustomer(a?.id || 0);
        this.articleLookup.onObjectSelected = a => this.onArticleLookup(a);
        this.projectLookup.onObjectSelected = a => this.onProject(a);
    }

    t(d: Date) {
        return d? this.datePipe.transform(d, 'yyyy-MM-dd') : '';
    }

    public override setupForm(b: Schedule) {
        this.projectSrv.setParentId(b?.autogenId||0);
        const form = this.formBuilder.group({
            id:          [b.id],
            parentId:    [b.parentId || this.loginSrv.appCtx.agentId, Validators.required],
            salesDate:   [b.salesDate || new Date(), Validators.required],
            productRef:  [b.productRef, Validators.required],
            qty:         [b.qty, Validators.required],
            price:       [b.price||0],
            projectId:   [b.projectId, Validators.required],
            vat:         [b.vat, Validators.required],
            discount:    [b.discount||0, Validators.required],
            isPrinted:   [b.isPrinted||false, Validators.required],
            canceled:    [b.canceled],
            isDesktop:   [b.isDesktop||true, Validators.required]
        });
        this.subscriptions.push(
            form.valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(_ => this.saveButton.disabled = !this.form?.valid || this.balance() - this.qty() * this.price() < 1)
        );
        this.saveButton.disabled = b.id < 1;
        return form;
    }

    override finishLoading(e: Schedule) {
        super.finishLoading(e);
        if (e.id) {
            this.price.set(e.price|| 0);
            this.entitySrv.setParentId(e.parentId);
            this.price.set(e.price);
            this.qty.set(e.qty);

            this.projectSrv
                .getQuantities(e.projectId||0)
                .pipe(tap(q => this.remainingQty.set(q.remaining)),
                      switchMap(_ => this.entitySrv.getBalance(e.parentId, e.id)),
                      tap(res => this.balance.set(res + 1000000)),
                      switchMap(_ => this.entitySrv.getQuantities(e.productRef)),
                      tap(res => this.quantities.set(res.map(e => e.qty))),
                    switchMap(() => this.articleSrv.get(e.productId)))
                .subscribe(art => {
                    this.onArticle(art)
                });
        }
    }


    onProject(p: SSProject) {
        this.form.controls['projectId'].setValue(p?.id);
        this.projectSrv
            .getQuantities(p?.id)
            .subscribe(res => {
                this.remainingQty.set(res.remaining);
            });
    }

    // onProject2(p: SSProject) {
    //     this.projectSrv
    //         .getQuantities(p?.id)
    //         .subscribe(res => {
    //             this.remainingQty = res.remaining;
    //         });
    // }

    private onCustomer(id: number) {
        this.entitySrv.setParentId(id);
        this.projectSrv.setParentId(id);
        this.form.controls['parentId'].setValue(id);

        this.entitySrv
            .getBalance(id, this.form.get('id').value)
            .subscribe(res => this.balance.set(res + 1000000));
    }

    // onDate(date: string) {
    //     this.articles = [
    //         ...new Set(this.quotas
    //             .filter(q => this.t(q.salesDate) === date)
    //             .map(q => <Article> {
    //                 id: q.productId,
    //                 reference: q.reference,
    //                 description2: q.description,
    //                 price1: q.price
    //             }))];
    // }


    private onArticleLookup(a: Article) {
        this.form?.controls['vat'].setValue(a?.vatValue||0);
        this.form?.controls['price'].setValue(a?.price1||0);
        this.onArticle(a);
    }
    private onArticle(a: Article) {
        this.price.set(    a?.price1 || 0);
        this.vats.set(     [... new Set([0, a.vatValue || 0])]);
        this.discounts.set([... new Set([0, a.discount || 0])]);
        this.saveButton.disabled = !this.form?.valid || this.balance() - this.qty() * this.price() < 1 || this.remainingQty() - this.qty() < -1;

        this.entitySrv
            .getQuantities(a?.reference)
            .subscribe(res => {
                this.quantities.set(res.map(e => e.qty));
            });
    }

    onQty(e: MatSelectChange) {
        this.qty.set(e.value);
        this.saveButton.disabled = !this.form?.valid || this.balance() - this.qty() * this.price() < 1 || this.remainingQty() - this.qty() < -1;
    }

    override readForm(): Schedule {
        // const raw: Schedule = this.form.getRawValue();
        // const sched = super.readForm();
        // sched.centerId = this.loginSrv.appCtx.id;
        // sched.isDesktop = false;
        // sched.parentId = raw.parentId;
        // sched.serialNumber = 0;
        // sched.userId = this.loginSrv.appCtx.id;
        // sched.price = this.price;
        // sched.canceled = false;
        // sched.vat = this.articles.find(a => a.reference === sched.productRef)?.vat || 0.0;
        // sched.discount = this.quotas.find(q => this.t(q.salesDate) === this.t(sched.salesDate) && q.reference === sched.productRef)?.discount || 0;
        // sched.isPrinted = false;
        // sched.is_refund = false;
        // sched.brutWeight = 0;
        return this.form.getRawValue();
    }
}
