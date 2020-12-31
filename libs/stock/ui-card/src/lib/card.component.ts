import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Card, CardService} from "@ss/stock/api-card";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ArticleService} from "@ss/stock/api-article";
import {PaginationModel} from "@ss/common/ui-pagination";
import {LanguageService} from "@ss/common/ui-lang";

@Component({
    selector: 'ss-card',
    styleUrls: ['./card.component.scss'],
    templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {


    //
    public readonly pagination = PaginationModel.newInstance();


    parentId: number;
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
                public confirmationSrv: ConfirmationDialogService) {
    }


    ngOnInit() {
        this.route.queryParams.subscribe(x => {
            const articleId = +x.id;
            const storeId = +x.store;
            if (articleId && storeId) {
                this.cardSrv.setParentsIds(articleId, storeId);
                this.loadCard();
            }
        });
    }


    loadCard() {
        this.shellSrv.setLoading(true);
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
