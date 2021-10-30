import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService, Store, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {ArticleAutocompleteModel, ArticleService} from '@ss/stock/api-article';
import { fillObject } from '@ss/common/api-common';
import {TransactionLine, TransactionLinesService} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-delivery-lines-detail',
    templateUrl: './delivery-lines-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class DeliveryLinesDetailComponent extends BaseEntityDetailComponent<TransactionLine> implements OnInit {
   private line: TransactionLine = null;

    parentId: number;

    articleAutoCompleteModel  = new ArticleAutocompleteModel(this.articleSrv);
    storeAutoCompleteModel: DefaultAutoCompleteModel<Store> = new DefaultAutoCompleteModel<Store>(this.storeNameSrv);

    constructor(
        public deliveryLinesService: TransactionLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: LotsService,
        public lookupsSrv: LookupsService) {
        super(deliveryLinesService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv,

            'SALES_EDIT_DELIVERY_LINES'
        );
    }


    preload(): Observable<any> {
        return this.route.queryParams
            .pipe(
                tap(p => {
                    this.parentId = +p.parent;
                    this.deliveryLinesService.setParentId(this.parentId);
                    return p;
                })
            );
    }


    ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../../' + this.parentId, this.route);
    }

    public setupForm(b: TransactionLine) {
        this.line = b;
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            transacId: [this.parentId],
            reference: [ { value: b.reference, disabled:  b.qtySatisfied > 0.0001 }],
            sourceDoc: [b.sourceDoc],
            store: [b.store],
            qtyOrdered: [b.qtyOrdered],
            qtySatisfied: [b.qtySatisfied],
            qtyInvoiced: [b.qtyInvoiced],
            qtyReturned: [b.qtyReturned],
            price: [b.price],
            vat: [b.vat],
            observation: [b.observation],
            footerMemo: [b.footerMemo],
            position: [{ value: b.position || 0, disabled: true }],
        });
    }


    finishLoading(e: TransactionLine) {
        super.finishLoading(e);
        this.form.get('qtySatisfied').valueChanges.subscribe(next => {
            if (typeof next === 'number') {
                if (next > 0.0 && this.line.reference) {
                    this.form.get('reference').disable();
                    this.form.get('store').disable();
                } else {
                    this.form.get('reference').enable();
                    this.form.get('store').enable();
                }
            }
        })
    }

    readForm(): TransactionLine {
        const form =  super.readForm();
        fillObject(this.line, form)
        return form;
    }
}
