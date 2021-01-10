import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {LookupsService, StoreName, StoreNameService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {ReceptionLines, ReceptionLinesService} from "@ss/stock/api-reception-lines";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";
import {Article, ArticleService} from "@ss/stock/api-article";
import {DETAIL_URL} from "@ss/common/api-common";


@Component({
    selector: 'ss-reception-lines-detail',
    styleUrls: ['./reception-lines-detail.component.scss'],
    templateUrl: './reception-lines-detail.component.html'
})
export class ReceptionLinesDetailComponent extends BaseEntityDetailComponent<ReceptionLines> {


    parentId: number;

    articleAutoCompleteModel: DefaultAutoCompleteModel<Article> = new DefaultAutoCompleteModel<Article>(this.articleSrv);
    storeAutoCompleteModel: DefaultAutoCompleteModel<StoreName> = new DefaultAutoCompleteModel<StoreName>(this.storeNameSrv);

    constructor(
        public ReceptionLinesService: ReceptionLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: StoreNameService,
        public lookupsSrv: LookupsService) {
        super(ReceptionLinesService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv,

            'STOCK_EDIT_RECEPTION_LINES'
        );
    }


    preload(): Observable<any> {
        return this.route.queryParams
            .pipe(
                tap(p => {
                    this.parentId = +p.parent;
                    this.ReceptionLinesService.setParentId(this.parentId);
                    return p;
                })
            );
    }


    ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../' + DETAIL_URL, this.route, {id: this.parentId});
    }

    public setupForm(b: ReceptionLines) {
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
