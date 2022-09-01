import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Article, Quota, Schedule, ScheduleService} from '@ss/scheduled-sales/api-scheduled-sales';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {LoginService} from '@ss/common/api-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, CustomerService} from '@ss/logistics/api-agent';
import {DatePipe} from '@angular/common';
import {MatSelectChange} from '@angular/material/select';
import {switchMap, tap} from 'rxjs';

// type Article = { id: number, reference: string, description: string};

@Component({
    selector: 'ss-sales-schedule-detail',
    templateUrl: './sales-schedule-detail.component.html',
    styleUrls: ['./sales-schedule-detail.component.scss'],
})
export class SalesScheduleDetailComponent extends BaseEntityDetailComponent<Schedule> {
    private datePipe = new DatePipe('en');
    userLogin = false;
    public dateFilter = (d: Date | null): boolean => d != null && this.quotas.find(q => this.t(q?.salesDate) === this.t(d)) !== undefined;
    public customerLookup = new DefaultAutoCompleteModel<Agent>(this.customerSrv, 'id', 'denomination')
    public quotas: Quota[] = [];
    public articles: Article[] = [];
    public quantities: number[] = [];
    public balance = 0;
    public remainingQty = 0;
    public price = 1000;

    constructor(
        public override entitySrv: ScheduleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService,
        private customerSrv: CustomerService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SCH_RESERVATION');
        this.customerLookup.onObjectSelected = a => this.onCustomer(a);
    }

    private t(d: Date) {
        return d? this.datePipe.transform(d, 'yyyyMMdd') : '';
    }
    public setupForm(b: Schedule) {
        this.userLogin = !this.loginSrv.appCtx.agentId && this.loginSrv.appCtx.id > 0;
        return this.formBuilder.group({
            id: [b.id],
            parentId: [b.parentId || this.loginSrv.appCtx.agentId, Validators.required],
            salesDate: [b.salesDate, Validators.required],
            productRef: [b.productRef, Validators.required],
            qty: [b.qty, Validators.required],
        });
    }

    private onCustomer(a: Agent) {
        this.entitySrv
            .getQuotas(a?.id || 0)
            .pipe(tap(res => this.quotas = res),
                switchMap(_ => this.entitySrv.getBalance(a?.id || 0, this.form.get('id').value)))
            .subscribe(res => this.balance = res);
    }

    onDate(date: any) {
        console.log(date);

        this.articles = [
            ...new Set(this.quotas
                .filter(q => q.salesDate === date)
                .map(q => <Article>{
                    id: q.productId,
                    reference: q.reference,
                    description2: q.description,
                    price1: q.price
                }))];

    }
    onArticle(a: MatSelectChange) {
        const agentId = this.form.get('parentId').value;
        const schedId = this.form.get('id').value;
        const date    = this.form.get('salesDate').value;
        this.entitySrv
            .getQuantities(a.value)
            .pipe(tap(res => this.quantities = res.map(e => e.qty)),
                switchMap(_ => this.entitySrv.getRemainingQty(agentId, schedId, a.value, date)))
            .subscribe(res => this.remainingQty = res);
    }
}
