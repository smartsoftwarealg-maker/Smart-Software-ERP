import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Article, ArticleAutocompleteModel, ArticleService} from '@ss/stock/api-article';
import {LookupsService, LotsService, Store} from '@ss/common/api-lookup';
import {Observable, Subscription, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {fillObject, LoginService} from '@ss/common/api-common';
import {TransactionLine} from './transaction-line';
import {TransactionLinesService} from './transaction-lines.service';

export abstract class BaseTransactionLinesDetailComponent extends BaseEntityDetailComponent<TransactionLine>  {
    private subscriptions: Subscription[] = [];
    protected line: TransactionLine = null;
    agentId = 0;
    parentId: number;
    selectedReference: string = null;
    isManager = false;

    articleAutoCompleteModel  = new ArticleAutocompleteModel(this.articleSrv);
    storeAutoCompleteModel: DefaultAutoCompleteModel<Store> = new DefaultAutoCompleteModel<Store>(this.storeNameSrv);

    constructor(
        public detailSrv: TransactionLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: LotsService,
        public lookupsSrv: LookupsService,
        public title: string) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, title);
        this.articleAutoCompleteModel.onObjectSelected = a => this.onArticle(a);
    }

    preload(): Observable<any> {
        return this.route
            .queryParams
            .pipe(
                tap(p => {
                    this.parentId = +p.parent;
                    this.detailSrv.setParentId(this.parentId);
                }),
                switchMap(id => this.detailSrv.getTransaction(this.parentId)),
                tap(transac => this.agentId = transac.agent),
            );
    }


    protected onInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../../' + this.parentId, this.route);
    }

    protected onDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }



    finishLoading(e: TransactionLine) {
        super.finishLoading(e);
        const subs1 = this.form.get('qtySatisfied').valueChanges.subscribe(next => {
            if (typeof next === 'number') {
                if (next > 0.0 && this.line.reference) {
                    this.form.get('reference').disable();
                    this.form.get('store').disable();
                } else {
                    this.form.get('reference').enable();
                    this.form.get('store').enable();
                }
            }
        });
        const subs2 = this.form.get('qtyOrdered').valueChanges.subscribe(next => {
            if (typeof next === 'number') {
                if (next > 0.0 && this.line.reference) {
                    this.form.get('reference').disable();
                    this.form.get('store').disable();
                } else {
                    this.form.get('reference').enable();
                    this.form.get('store').enable();
                }
            }
        });
        this.subscriptions.push(subs1);
        this.subscriptions.push(subs2);
    }

    readForm(): TransactionLine {
        const form =  super.readForm();
        fillObject(this.line, form)
        return form;
    }

    onArticle(a: Article | string) {
        this.selectedReference = typeof a === 'string'? a : a.reference? a.reference : null;
    }
    public setupForm(b: TransactionLine): FormGroup {
        this.line = b;
        this.selectedReference = b?.reference;
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            transacId: [this.parentId],
            reference: [ { value: b.reference, disabled:  b.qtySatisfied > 0.0001 }],
            sourceDoc: [b.sourceDoc],
            store: [b.store],
            qtyOrdered: [b.qtyOrdered],
            qtySatisfied: [b.qtySatisfied ||0, Validators.required],
            qtyInvoiced: [b.qtyInvoiced ||0, Validators.required],
            qtyReturned: [b.qtyReturned ||0, Validators.required],
            price: [b.price || 0, Validators.required],
            vat: [b.vat || 0, Validators.required],
            observation: [b.observation],
            footerMemo: [b.footerMemo],
            position: [{ value: b.position || 0, disabled: true }],
        });
    }
}
