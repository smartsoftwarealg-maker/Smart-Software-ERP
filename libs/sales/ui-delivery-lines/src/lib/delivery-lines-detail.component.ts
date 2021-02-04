import {Component, OnInit} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {LookupsService, StoreName, StoreNameService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";
import {Article, ArticleService} from "@ss/stock/api-article";
import {DETAIL_URL} from "@ss/common/api-common";
import {DeliveryLine, DeliveryLinesService} from "@ss/sales/api-delivery-lines";


@Component({
    selector: 'ss-delivery-lines-detail',
    styleUrls: ['./delivery-lines-detail.component.scss'],
    templateUrl: './delivery-lines-detail.component.html'
})
export class DeliveryLinesDetailComponent extends BaseEntityDetailComponent<DeliveryLine> implements OnInit {
   private line: DeliveryLine = null;

    parentId: number;

    articleAutoCompleteModel: DefaultAutoCompleteModel<Article> = new DefaultAutoCompleteModel<Article>(this.articleSrv, 'reference', 'description2');
    storeAutoCompleteModel: DefaultAutoCompleteModel<StoreName> = new DefaultAutoCompleteModel<StoreName>(this.storeNameSrv);

    constructor(
        public deliveryLinesService: DeliveryLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: StoreNameService,
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
        this.shellSrv.setGoBackPath('../' + DETAIL_URL, this.route, {id: this.parentId});
    }

    public setupForm(b: DeliveryLine) {
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
            observation: [b.observation],
            footerMemo: [b.footerMemo],
            position: [{ value: b.position || 0, disabled: true }],
        });
    }

    private fillObject(from, to) {
        for (const key in from) {
            if (from.hasOwnProperty(key)) {
                if (Object.prototype.toString.call(from[key]) === '[object Object]') {
                    if (!to.hasOwnProperty(key)) {
                        to[key] = {};
                    }
                    this.fillObject(from[key], to[key]);
                }
                else if (!to.hasOwnProperty(key)) {
                    to[key] = from[key];
                }
            }
        }
    }

    finishLoading(e: DeliveryLine) {
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

    readForm(): DeliveryLine {
        const form =  super.readForm();
        this.fillObject(this.line, form)
        return form;
    }
}
