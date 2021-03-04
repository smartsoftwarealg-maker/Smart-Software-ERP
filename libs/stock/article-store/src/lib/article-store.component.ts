import {Component, Input, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Article} from "@ss/stock/api-article";
import {PaginationModel} from "@ss/common/ui-pagination";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";
import {Lot, LotsService} from "@ss/common/api-lookup";
import {FormControl, FormGroup} from "@angular/forms";
import {ArticleLot, ArticleStoresService} from "@ss/stock/api-article-store";

@Component({
    selector: 'ss-article-store',
    styleUrls: ['./article-store.component.scss'],
    templateUrl: './article-store.component.html'
})
export class ArticleStoreComponent implements OnInit {

    @Input() article!: Article;

    storeAutoCompleteModel: DefaultAutoCompleteModel<Lot> = new DefaultAutoCompleteModel<Lot>(this.lotsService);
    lots: { [id: number]: string; };
    storeForm: FormGroup = new FormGroup({
        storeId: new FormControl(),
        stock: new FormControl(),
        referenceId: new FormControl(),
        reference: new FormControl(),
        id: new FormControl()
    });

    //
    public readonly pagination = PaginationModel.newInstance();


    data: ArticleLot[];

    displayedColumns = [
        "storeId",
        "stock"
    ];


    constructor(public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public articleStoreSrv: ArticleStoresService,
                public lotsService: LotsService,
                public confirmationSrv: ConfirmationDialogService) {
    }


    ngOnInit() {
        this.articleStoreSrv.setParentId(this.article.id);
        this.pagination.onChange = () => this.loadArticleStore();
        this.storeForm.setValue({
            storeId: null,
            stock: 0.00,
            referenceId: this.article.id,
            reference: this.article.reference,
            id: 0
        });
        this.loadArticleStore();
    }


    loadArticleStore() {
        this.articleStoreSrv.getPage(this.pagination).subscribe((x: ArticleLot[]) => {
            const ids = x.map(x => x.id);
            this.lotsService.getAll(ids).subscribe((s: Lot[]) => {
                this.lots = s.reduce(
                    (total, currentValue) => {
                        total[currentValue.id] = currentValue.description;
                        return total
                    }, {}
                );
            });
            this.data = x;
        });

    }

    addStore() {
        this.articleStoreSrv.add(this.storeForm.value)
            .subscribe(
                res => {
                    this.snackBarSrv.showSuccessMessage();
                },
                err => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                },
                ()=>{
                    this.loadArticleStore();
                })
    }
}
