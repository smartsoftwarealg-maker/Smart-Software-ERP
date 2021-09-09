import { CanDeactivate, RouterStateSnapshot, UrlTree, ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '../../common/confirmation-dialog/confirmation-dialog.service';
import { Payment, agentsUrl, paymentsUrl, AgentACModel } from './payment-api';
import { HttpService } from '../../smart-lib/common/http.service';
import { SnackBarService } from '../../common/snack-bar.service';
import { UserService } from '../../smart-lib/components/login/user.service';
import { PaymentService } from './payment.service';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { AbstractEntityView } from '../../common/base-classes/abstract-entity-view';
import { LoadingState } from '../../common/util';
import { switchMap } from 'rxjs/operators';
import { isString } from '@ss/common/api-common';



@Component({
    selector: 'app-payment-detail',
    styleUrls: ['./payment-detail.component.scss'],
    templateUrl: './payment-detail.component.html'
})
export class PaymentDetailComponent extends AbstractEntityView<Payment, BackendDataSource<Payment>> implements OnInit, OnDestroy {

    saved = false;
    public form: FormGroup = null;
    private record: Payment;
    agentAcModel: AgentACModel;

    constructor(
        public httpSrv: HttpService,
        public snackBarSrv: SnackBarService,
        private formBuilder: FormBuilder,
        public userSrv: UserService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private confirmationSrv: ConfirmationDialogService,
        private paySrv: PaymentService) {
        // entity: null
        super(new BackendDataSource(httpSrv, null), userSrv.getRights(null), snackBarSrv);
        this.agentAcModel = new AgentACModel(httpSrv);
    }

    ngOnInit(): void {
        const entity = this.paySrv.getActiveEntity();
        //
        const observable: Observable<any> = this.paySrv.load();
        const routeId = this.getIdFromRoute();
        if (entity == null || (entity.id + '') !== routeId) {
            if (routeId === '0') {
                observable.subscribe(
                    () => this.load({
                        id: 0,
                        amount: null,
                        agent: this.getParentIdFromRoute(),
                        center: null,
                        date: null,
                        payMethod: null,
                        bankId: null,
                        checkBank: null,
                        document: 0,
                        checkDate: null,
                        checkNumb: null
                    }),
                    err => {
                        this.loadingState = LoadingState.ERROR;
                        throw err;
                    }
                );
            } else {
                const i = this.getIdFromRoute();
                this.dataSrc.setUrl(agentsUrl + '/' + this.getParentIdFromRoute() + paymentsUrl);
                observable.pipe(
                    switchMap(() => this.dataSrc.getById(i))
                ).subscribe(
                    e => this.load(e),
                    err => {
                        this.loadingState = LoadingState.ERROR;
                        throw err;
                    }
                );
            }
        } else {
            observable.subscribe(
                () => this.load(entity),
                err => {
                    this.loadingState = LoadingState.ERROR;
                    throw err;
                }
            );
        }
    }

    ngOnDestroy(): void {
    }

    load(rec: Payment): void {
        this.record = rec;
        this.form = this.formBuilder.group({
            agent: this.record.agent,
            amount: [this.record.amount, Validators.required],
            date: [this.record.date],
            payMethod: [this.record.payMethod, Validators.required],
            bankId: this.record.bankId,
            checkBank: this.record.checkBank,
            document: this.record.document,
            checkDate: this.record.checkDate,
            checkNumb: this.record.checkNumb
        });
        this.loadingState = LoadingState.COMPLETE;
    }

    getIdFromRoute(): string {
        return this.activatedRoute.snapshot.params.id;
    }

    getParentIdFromRoute(): number {
        const i = this.activatedRoute.snapshot.parent.params.pid;
        if (isString(i)) {
            return +i;
        }
        return i;
    }

    savePayment(): void {
        const formData = this.form.value;
        this.record.amount = formData.amount;
        this.record.agent = formData.agent;
        this.record.date = formData.date;
        this.record.payMethod = formData.payMethod;
        this.record.bankId = formData.bankId;
        this.record.checkBank = formData.checkBank;
        this.record.document = formData.document;
        this.record.checkDate = formData.checkDate;
        this.record.checkNumb = formData.checkNumb;
        this.save(this.record, success => {
            if (success) {
                this.close(false);
            }
        });
    }

    close(confirm: boolean): void {
        this.saved = !confirm;
        this.activatedRoute.queryParams.subscribe(params => {
            const cmd = params.referer;
            if (cmd) {
                this.router.navigate([cmd]);
            } else {
                this.router.navigate(['../..'], { relativeTo: this.activatedRoute });
            }
        });
    }

    public canBeDeactivated(): Observable<boolean> | boolean {
        if (this.saved) {
            return true;
        }
        return this.confirmationSrv.confirmDontSave();
    }
}

export class CanDeactivateService implements CanDeactivate<PaymentDetailComponent> {

    // tslint:disable-next-line:max-line-length
    canDeactivate(component: PaymentDetailComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canBeDeactivated();
    }

}