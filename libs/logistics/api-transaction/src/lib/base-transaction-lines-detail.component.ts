import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Article, ArticleAutoCompleteModel, ArticleService, LotAutoCompleteModel, QtyPrice} from '@ss/stock/api-article';
import { LookupsService, LotsService, Store } from '@ss/common/api-lookup';
import {Observable, switchMap} from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import {LoginService} from '@ss/common/api-common';
import {TransactionLine} from './transaction-line';
import {TransactionLinesClass} from './transaction-lines.class';
import {inject} from '@angular/core';
import {OptionService} from '@ss/logistics/ui-options';
import { DOC_SEPARATOR_200, DOC_SEPARATOR_800 } from './transaction';

export abstract class BaseTransactionLinesDetailComponent extends BaseEntityDetailComponent<TransactionLine> {
    private loginSrv  =  inject(LoginService);
    private optionSrv =  inject(OptionService);
    showStock = true;
    selectedRow: TransactionLine = null;
    agentId = 0;
    parentId: number;
    selectedReference: string = null;
    isManager = false;
    mainStore = 0;

    articleStock = 0.0;
    articleAutoCompleteModel: ArticleAutoCompleteModel = null;
    storeAutoCompleteModel: LotAutoCompleteModel = null;

    protected constructor(
        public  detailSrv: TransactionLinesClass,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public          articleSrv: ArticleService,
        public          lotSrv: LotsService,
        public          lookupsSrv: LookupsService,
        public override title: string,
        public document: number) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, title);
        this.articleAutoCompleteModel = new ArticleAutoCompleteModel(this.articleSrv);
        this.storeAutoCompleteModel   = new LotAutoCompleteModel(this.lotSrv);
        this.articleAutoCompleteModel.onObjectSelected = (a) => this.onArticle(a);
        this.storeAutoCompleteModel.onObjectSelected =  (s) => this.onStore(s);
    }

    override preload(): Observable<any> {
        return this.route
            .queryParams
            .pipe(
                tap(p => {
                    this.parentId = +p['parent'];
                    this.detailSrv.setParentId(this.parentId);
                    this.shellSrv.setGoBackPath('../../' + this.parentId, this.route);
                }),
                switchMap(_ => this.optionSrv.get(this.loginSrv.appCtx.center)),
                tap(res => this.mainStore = res.mainStore),
                switchMap(_ => this.detailSrv.getTransaction(this.parentId)),
                tap(transac => this.agentId = transac.agent),
            );
    }

    private updateStockAndValue(res: QtyPrice) {
        this.form.controls['price'].setValue(res.price);
        this.articleStock = res.qty;
    }

    override finishLoading(e: TransactionLine) {
        super.finishLoading(e);
        this.selectedRow = e;
        const subs2 = this.form.get('qtySatisfied')
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(next => {
                if (next > 0.0) {
                    this.form.get('reference').disable();
                    this.form.get('store').disable();
                } else {
                    this.form.get('reference').enable();
                    this.form.get('store').enable();
                }
            });
        this.subscriptions.push(subs2);
    }

    override readForm(): TransactionLine {
        return this.form.getRawValue();
        // const form =  super.readForm();
        // fillObject(this.selectedRow, form);
        // return form;
    }

    onArticle(a: Article | string) {
        this.selectedReference = typeof a === 'string'? a : a.reference? a.reference : null;
        this.articleSrv
            .getPPrice(this.selectedReference, this.form?.controls['store'].value || 0, this.parentId, this.id)
            .subscribe({
                next: res => this.updateStockAndValue(res),
                error: err => this.form.controls['price'].setValue(0.0)
            });
    }

    onStore(s: Store) {
        this.articleSrv
            .getPPrice(this.selectedReference, s?.id || 0, this.parentId, this.id)
            .subscribe({
                next: res => this.updateStockAndValue(res),
                error: err => this.form.controls['price'].setValue(0.0)
            });
    }

    public override setupForm(b: TransactionLine): UntypedFormGroup {
        this.selectedRow = b;
        this.selectedReference = b?.reference;
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            transacId: [this.parentId],
            reference: [ { value: b.reference || null, disabled:  b.qtySatisfied > 0.0001 }, Validators.required ],
            sourceDoc: [b.sourceDoc],
            store: [b.store],
            qtyOrdered: [{ value: b.qtyOrdered || 0, disabled: this.document > DOC_SEPARATOR_200 && this.document < DOC_SEPARATOR_800 }, Validators.required],
            qtySatisfied: [{ value: b.qtySatisfied ||0, disabled: this.document < DOC_SEPARATOR_200 || this.document > DOC_SEPARATOR_800}, Validators.required],
            qtyInvoiced: [b.qtyInvoiced ||0, Validators.required],
            qtyReturned: [b.qtyReturned ||0, Validators.required],
            price: [b.price || 0, Validators.required],
            vat: [b.vat || 0, Validators.required],
            observation: [b.observation],
            footerMemo: [b.footerMemo],
            position: [{ value: b.position || 0, disabled: true }],
        });
    }

    protected isValidForm(): boolean {
        const value = this.form.getRawValue();
        return super.isValidForm() && value.reference;
    }


}
