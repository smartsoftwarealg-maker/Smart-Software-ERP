import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService, Store, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ConsumptionLinesService} from '@ss/stock/api-consumption-lines';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Article, ArticleService} from '@ss/stock/api-article';
import {ArticleAutoCompleteModel, LotAutoCompleteModel} from '@ss/logistics/api-logistics-common';
import {TransactionLine} from '@ss/logistics/api-transaction';
import {DocInfoComponent} from '@ss/logistics/ui-doc-info';


@Component({
    selector: 'ss-consumption-lines-detail',
    templateUrl: './consumption-lines-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class ConsumptionLinesDetailComponent extends BaseEntityDetailComponent<TransactionLine> implements OnInit, OnDestroy {
    @ViewChild(DocInfoComponent) infoChild = null;

    parentId: number;
    selectedRow: any;


    articleAutoCompleteModel: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(this.articleSrv);
    storeAutoCompleteModel: LotAutoCompleteModel = new LotAutoCompleteModel(this.storeNameSrv);

    constructor(
        public consumptionLinesService: ConsumptionLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: LotsService,
        public lookupsSrv: LookupsService) {
        super(consumptionLinesService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv,'STOCK_EDIT_CONSUMPTION_LINES');
    }



    preload(): Observable<any> {
        return this.route.queryParams
            .pipe(
                tap(p => {
                    this.parentId = +p.parent;
                    this.consumptionLinesService.setParentId(this.parentId);
                    return p;
                })
            );
    }

    ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../../' + this.parentId, this.route);

        const store = this.form?.controls['store'].value || 0;
        this.articleAutoCompleteModel.evenEmitter.subscribe(art => {
            if (this.infoChild) {
                this.infoChild.params = { articleReference: <string>art, articleStoreId: store };
            }
            this.articleSrv
                .getPPrice(<string>art, store, this.parentId, this.id)
                .subscribe({
                    next: res => {
                        this.form?.controls['pprice'].setValue(res.price);
                        this.form?.controls['price'].setValue(res.price);
                        this.form?.controls['stock'].setValue(res.qty);
                    },
                    error: err => this.form.controls['price'].setValue(0.0)
                })
        });

        this.storeAutoCompleteModel
            .evenEmitter.subscribe(id => {
            this.articleSrv
                .getPPrice(this.form.controls['reference'].value, <number>id || 0, this.parentId, this.id)
                .subscribe({
                    next: res => {
                        this.form?.controls['pprice'].setValue(res.price);
                        this.form?.controls['price'].setValue(res.price);
                        this.form?.controls['stock'].setValue(res.qty);
                    },
                    error: err => this.form.controls['price'].setValue(0.0)
                })
        });
    }

    ngOnDestroy() {
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
        return this.formBuilder.group({
            id: [b.id],
            transacId: [this.parentId],
            reference: [b.reference],
            sourceDoc: [b.sourceDoc],
            store: [b.store],
            qtyOrdered: [b.qtyOrdered],
            qtySatisfied: [b.qtySatisfied],
            qtyInvoiced: [b.qtyInvoiced],
            qtyReturned: [b.qtyReturned],
            price: [{ value: b.price, disabled: true}, Validators.required],
            observation: [b.observation],
            footerMemo: [b.footerMemo],
            position: [b.position],
            pprice: [b.pprice],
            stock: [{ value: 0.0, disabled: true} ]
        });
    }

    readForm(): TransactionLine {
        const value = super.readForm();
        value.price = value.pprice;
        return value;
    }
}
