import {Component, OnInit} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {LookupsService, StoreName, StoreNameService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {ConsumptionLines, ConsumptionLinesService} from "@ss/stock/api-consumption-lines";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {AutoCompleteModel} from "@ss/common/ui-auto-complete";
import {Article, ArticleService} from "@ss/stock/api-article";
import {DETAIL_URL} from "@ss/common/api-common";


@Component({
    selector: 'ss-consumption-lines-detail',
    styleUrls: ['./consumption-lines-detail.component.scss'],
    templateUrl: './consumption-lines-detail.component.html'
})
export class ConsumptionLinesDetailComponent extends BaseEntityDetailComponent<ConsumptionLines> implements OnInit {


    parentId: number;

    articleAutoCompleteModel: AutoCompleteModel<Article> = new AutoCompleteModel<Article>(this.articleSrv);
    storeAutoCompleteModel: AutoCompleteModel<StoreName> = new AutoCompleteModel<StoreName>(this.storeNameSrv);

    constructor(
        public consumptionLinesService: ConsumptionLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: StoreNameService,
        public lookupsSrv: LookupsService) {
        super(consumptionLinesService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv,

            'STOCK_EDIT_CONSUMPTION_LINES'
        );
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
        this.shellSrv.setGoBackPath('../' + DETAIL_URL, this.route, {id: this.parentId});
    }

    public setupForm(b: ConsumptionLines) {
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
            price: [b.price],
            observation: [b.observation],
            footerMemo: [b.footerMemo],
            position: [b.position],
            pprice: [b.pprice],
        });
    }


}
