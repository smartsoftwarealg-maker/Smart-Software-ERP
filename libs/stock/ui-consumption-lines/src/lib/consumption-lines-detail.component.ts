import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ConsumptionLinesService} from '@ss/stock/api-consumption-lines';
import {Observable, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ArticleAutoCompleteModel, ArticleService, LotAutoCompleteModel, QtyPrice} from '@ss/stock/api-article';
import {TransactionLine} from '@ss/logistics/api-transaction';
import {LoginService} from '@ss/common/api-common';
import {OptionService} from '@ss/logistics/ui-options';


@Component({
    selector: 'ss-consumption-lines-detail',
    templateUrl: './consumption-lines-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class ConsumptionLinesDetailComponent extends BaseEntityDetailComponent<TransactionLine> implements OnInit, OnDestroy {
    line: TransactionLine = null;

    parentId: number;
    selectedRow: any;
    articleStock = 0.0;
    showStock = false;
    mainStore = 0;


    articleAutoCompleteModel: ArticleAutoCompleteModel = null;
    storeAutoCompleteModel: LotAutoCompleteModel = null;

    constructor(
        public consumptionLinesService: ConsumptionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: LotsService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService,
        private optionSrv: OptionService) {
        super(consumptionLinesService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv,'STOCK_EDIT_CONSUMPTION_LINES');
        this.articleAutoCompleteModel = new ArticleAutoCompleteModel(this.articleSrv);
        this.storeAutoCompleteModel = new LotAutoCompleteModel(this.storeNameSrv);
    }

    override preload(): Observable<any> {
        return this.route.queryParams
            .pipe(
                tap(p => {
                    this.parentId = +p['parent'];
                    this.consumptionLinesService.setParentId(this.parentId);
                }),
                switchMap(_ => this.optionSrv.get(this.loginSrv.appCtx.center)),
                tap(res => this.mainStore = res.mainStore)
            );
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../../' + this.parentId, this.route);

        this.articleAutoCompleteModel.evenEmitter.subscribe(art => {
            const store = this.form?.controls['store'].value || 0;
            this.articleSrv
                .getPPrice(<string>art, store, this.parentId, this.id)
                .subscribe({
                    next: res => this.updateStockAndValue(res),
                    error: err => this.form.controls['price'].setValue(0.0)
                });
        });

        this.storeAutoCompleteModel
            .evenEmitter.subscribe(id => {
                this.articleSrv
                    .getPPrice(this.form.controls['reference'].value, <number>id || 0, this.parentId, this.id)
                    .subscribe({
                        next: res => this.updateStockAndValue(res),
                        error: err => this.form.controls['price'].setValue(0.0)
                    });
            });
    }

    private updateStockAndValue(res: QtyPrice) {
        this.form?.controls['pprice'].setValue(res.price);
        this.form?.controls['price'].setValue(res.price);
        this.articleStock = res.qty;
        this.showStock = true;
    }
    override ngOnDestroy() {
        this.articleAutoCompleteModel.evenEmitter.unsubscribe();
        this.storeAutoCompleteModel.evenEmitter.unsubscribe();
        super.ngOnDestroy();
    }

    override finishLoading(e: TransactionLine) {
        this.selectedRow = e;
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {reference: e.reference},
            queryParamsHandling: 'merge'
        }).then();
        super.finishLoading(e);
    }

    public override setupForm(b: TransactionLine) {
        // Make sure to update the template if you edit the configuration here
        this.line = b;
        return this.formBuilder.group({
            id: [b.id],
            transacId: [this.parentId],
            reference: [{ value: b.reference, disabled: b.qtySatisfied > 0 }],
            sourceDoc: [b.sourceDoc],
            store: [{ value: b.store, disabled: b.qtySatisfied > 0 }],
            qtyOrdered: [b.qtyOrdered],
            qtySatisfied: [b.qtySatisfied],
            qtyInvoiced: [b.qtyInvoiced],
            qtyReturned: [b.qtyReturned],
            price: [{ value: b.price, disabled: true}, Validators.required],
            observation: [b.observation],
            footerMemo: [b.footerMemo],
            position: [b.position],
            pprice: [b.pprice],
        });
    }

    override readForm(): TransactionLine {
        const value = super.readForm();
        value.price = value.pprice;
        value.reference = value.reference || this.line.reference;
        value.store = value.store || this.line.store;
        return value;
    }
}
