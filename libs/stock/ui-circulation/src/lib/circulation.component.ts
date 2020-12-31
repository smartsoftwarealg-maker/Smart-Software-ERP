import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Circulation, CirculationService} from "@ss/stock/api-circulation";
import {ArticleService} from "@ss/stock/api-article";
import {PaginationModel} from "@ss/common/ui-pagination";
import {LanguageService} from "@ss/common/ui-lang";

@Component({
    selector: 'ss-circulation',
    styleUrls: ['./circulation.component.scss'],
    templateUrl: './circulation.component.html'
})
export class CirculationComponent implements OnInit {


    //
    public readonly pagination = PaginationModel.newInstance();


    data: Circulation[];

    displayedColumns = [
        "document",
        "number",
        "date",
        "qty",
        "price",
        "pprice",
        "customer",
        "store"
    ];


    constructor(public circulationSrv: CirculationService,
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
                this.circulationSrv.setParentsIds(articleId, storeId);
                this.loadCirculation();
            }
        });
    }


    loadCirculation() {
        this.shellSrv.setLoading(true);
        this.circulationSrv.getPage(this.pagination)
            .subscribe((x: Circulation[]) => {
                this.data = x.map(y => {
                    y.date = this.langServ.formatDate(y.date);
                    return y;
                });
                this.shellSrv.setLoading(false);
            });
    }


}
