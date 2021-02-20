import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Card, CardService} from "@ss/stock/api-card";
import {ArticleService} from "@ss/stock/api-article";
import {PaginationModel} from "@ss/common/ui-pagination";
import {LanguageService} from "@ss/common/ui-lang";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";
import {StoreName} from "@ss/common/api-lookup";
import {FormControl, FormGroup} from "@angular/forms";
import {ArticleStoreService} from "@ss/stock/api-article-store";

@Component({
    selector: 'ss-card',
    styleUrls: ['./card.component.scss'],
    templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

    storeAutoCompleteModel: DefaultAutoCompleteModel<StoreName> = new DefaultAutoCompleteModel<StoreName>(this.storeSrv);

    storeForm: FormGroup = new FormGroup({
        store: new FormControl()
    });

    //
    public readonly pagination = PaginationModel.newInstance();


    articleId: number;
    storeId: number;
    useStoreForm: boolean = false;
    data: Card[];

    displayedColumns = [
        "document",
        "number",
        "date",
        "qtyIn",
        "qtyOut",
        "price",
        "stock",
        "value"
    ];


    constructor(public cardSrv: CardService,
                public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public articleSrv: ArticleService,
                public langServ: LanguageService,
                public storeSrv: ArticleStoreService,
                public confirmationSrv: ConfirmationDialogService) {
    }


    ngOnInit() {
        this.route.queryParams.subscribe(x => {
            this.articleId = +x.articleId
            this.storeSrv.setParentId(this.articleId);

            if (+x.articleStoreId) {
                this.storeId = x.articleStoreId
                this.loadCard();
            }

            this.useStoreForm = !!x.articleUseStoreSearch;

        });
    }


    loadCard() {
        if (this.useStoreForm && this.storeForm.valid) this.storeId = this.storeForm.value.store;

        this.shellSrv.setLoading(true);
        this.cardSrv.setParentsIds(this.articleId, this.storeId)
        this.cardSrv.getPage(this.pagination)
            .subscribe((x: Card[]) => {
                this.data = x.map(y => {
                    y.date = this.langServ.formatDate(y.date);
                    return y;
                });
                this.shellSrv.setLoading(false);
            });

    }


}
