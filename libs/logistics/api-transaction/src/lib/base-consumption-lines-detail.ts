import {
    BaseTransactionLinesDetailComponent,
    TransactionLine,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import {Directive, OnDestroy, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService, QtyPrice} from '@ss/stock/api-article';
import {LookupsService, LotsService} from '@ss/common/api-lookup';
import {ArticleAutoCompleteModel, LotAutoCompleteModel} from '@ss/logistics/api-logistics-common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Directive()
export abstract class BaseConsumptionLinesDetail extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    private consumptions = [260, 261, 266, 269, 270, 272, 510, 511, 513];
    line: TransactionLine = null;

    parentId: number;
    selectedRow: TransactionLine;
    articleStock = 0.0;
    showStock = false;


    articleAutoCompleteModel: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(this.articleSrv);
    storeAutoCompleteModel: LotAutoCompleteModel = new LotAutoCompleteModel(this.storeNameSrv);

    constructor(
        public detailSrv: TransactionLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: LotsService,
        public lookupsSrv: LookupsService,
        public router: Router,
        public title: string) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, articleSrv, storeNameSrv, lookupsSrv, title);
        this.articleAutoCompleteModel.onObjectSelected = a => this.onArticle(a);
    }


    preload(): Observable<any> {
        return this.route.queryParams
            .pipe(
                tap(p => {
                    this.parentId = +p.parent;
                    this.detailSrv.setParentId(this.parentId);
                    return p;
                })
            );
    }

    private updateStockAndValue(res: QtyPrice) {
        this.form?.controls['pprice'].setValue(res.price);
        this.form?.controls['price'].setValue(res.price);
        this.articleStock = res.qty;
        this.showStock = true;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../../' + this.parentId, this.route);

        const store = this.form?.controls['store'].value || 0;
        this.articleAutoCompleteModel.evenEmitter.subscribe(art => {
            this.articleSrv
                .getPPrice(<string>art, store, this.parentId, this.id)
                .subscribe({
                    next: res => this.updateStockAndValue(res),
                    error: err => this.form.controls['price'].setValue(0.0)
                })
        });

        const subs1 = this.storeAutoCompleteModel
            .evenEmitter
            .subscribe(id => {
                this.articleSrv
                    .getPPrice(this.form.controls['reference'].value, <number>id || 0, this.parentId, this.id)
                    .subscribe({
                        next: res => this.updateStockAndValue(res),
                        error: err => this.form.controls['price'].setValue(0.0)
                    })
            });
        const subs2 = this.articleAutoCompleteModel
            .evenEmitter
            .subscribe(ref => {
                this.articleSrv
                    .getPPrice(<string>ref, this.form.controls['store']?.value || 0, this.parentId, this.id)
                    .subscribe({
                        next: res => this.updateStockAndValue(res),
                        error: err => this.form.controls['price'].setValue(0.0)
                    })
            });
        this.subscriptions.push(subs1);
        this.subscriptions.push(subs2);
    }

    override ngOnDestroy() {
        this.articleAutoCompleteModel.evenEmitter.unsubscribe();
        this.storeAutoCompleteModel.evenEmitter.unsubscribe();
        super.ngOnDestroy();
    }

    finishLoading(e: TransactionLine) {
        this.selectedRow = e;
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {reference: e.reference},
            queryParamsHandling: 'merge'
        }).then();
        super.finishLoading(e);
    }

    public setupForm(b: TransactionLine) {
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
            price: [{ value: b.price, disabled: this.consumptions.find(e => e === b.document)}, Validators.required],
            observation: [b.observation],
            footerMemo: [b.footerMemo],
            position: [b.position],
            vat: [b.vat || 0, Validators.required],
            pprice: [b.pprice],
        });
    }

    readForm(): TransactionLine {
        const value = super.readForm();
        value.price = value.pprice;
        value.reference = value.reference || this.line.reference;
        value.store = value.store || this.line.store;
        return value;
    }
}
